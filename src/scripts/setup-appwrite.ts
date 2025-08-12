
/**
 * @fileoverview
 * Este script configura a estrutura inicial do banco de dados no Appwrite para a aplicação MobiCeolin.
 *
 * @instructions
 * 1. Certifique-se de que sua instância Appwrite está rodando.
 * 2. Preencha as variáveis de ambiente no arquivo `.env.local` na raiz do projeto:
 *    - NEXT_PUBLIC_APPWRITE_ENDPOINT: A URL do seu servidor Appwrite.
 *    - NEXT_PUBLIC_APPWRITE_PROJECT_ID: O ID do seu projeto Appwrite.
 *    - APPWRITE_API_KEY: Uma chave de API gerada no seu painel Appwrite com todos os escopos de permissão.
 * 3. Execute o script a partir do diretório raiz com o comando: `npm run appwrite:setup`
 *
 * @important
 * Este script foi projetado para ser executado uma vez, mas agora pode ser executado várias vezes com segurança.
 * Ele verificará se os recursos já existem antes de criá-los.
 */

import { Client, Databases, ID, Permission, Role } from 'node-appwrite';
import 'dotenv/config';

// --- Configuração ---
const client = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!)
    .setKey(process.env.APPWRITE_API_KEY!);

const databases = new Databases(client);

const DB_NAME = 'MobiCeolinDB';
const DB_ID = 'mobiceolin-db';

const COLLECTIONS = {
    USERS: {
        NAME: 'Users',
        ID: 'users'
    },
    VEHICLES: {
        NAME: 'Vehicles',
        ID: 'vehicles'
    },
    RIDES: {
        NAME: 'Rides',
        ID: 'rides'
    }
};

// --- Funções Auxiliares ---

/**
 * Cria uma nova coleção no banco de dados especificado, se ela não existir.
 * @param {string} dbId - O ID do banco de dados.
 * @param {object} collection - O objeto de configuração da coleção.
 */
async function createCollection(dbId: string, collection: { NAME: string, ID: string }) {
    try {
        await databases.getCollection(dbId, collection.ID);
        console.warn(`A coleção "${collection.NAME}" (${collection.ID}) já existe. Pulando.`);
    } catch (error: any) {
        if (error.code === 404) { // 404 Not Found indica que a coleção não existe
             console.log(`Criando coleção: ${collection.NAME}...`);
            await databases.createCollection(dbId, collection.ID, collection.NAME, [
                Permission.read(Role.any()),       // Qualquer um pode ler (para perfis públicos, etc.)
                Permission.create(Role.users()),   // Apenas usuários logados podem criar
                Permission.update(Role.users()),   // Usuários podem atualizar seus próprios documentos
                Permission.delete(Role.users()),   // Usuários podem deletar seus próprios documentos
            ]);
            console.log(`Coleção "${collection.NAME}" criada com sucesso.`);
        } else {
             console.error(`Erro ao verificar a coleção "${collection.NAME}":`, error.message);
            throw error;
        }
    }
}


/**
 * Cria os atributos para a coleção de usuários.
 */
async function createUsersAttributes() {
    try {
        console.log(`- Configurando atributos para a coleção "Users"...`);
        await databases.createStringAttribute(DB_ID, COLLECTIONS.USERS.ID, 'name', 255, true);
        await databases.createStringAttribute(DB_ID, COLLECTIONS.USERS.ID, 'role', 50, true); // 'passenger', 'driver', 'admin'
        await databases.createStringAttribute(DB_ID, COLLECTIONS.USERS.ID, 'avatarId', 255, false); // ID da imagem no Storage
        await databases.createStringAttribute(DB_ID, COLLECTIONS.USERS.ID, 'pixKey', 255, false);
        console.log(`- Atributos de "Users" criados.`);
    } catch (error: any) {
        if (error.code === 409) {
            console.warn(`- Atributos para "Users" já existem. Pulando.`);
        } else {
            throw error;
        }
    }
}

/**
 * Cria os atributos para a coleção de veículos.
 */
async function createVehiclesAttributes() {
    try {
        console.log(`- Configurando atributos para a coleção "Vehicles"...`);
        // Relacionamento com o usuário (motorista)
        await databases.createStringAttribute(DB_ID, COLLECTIONS.VEHICLES.ID, 'driverId', 50, true);
        await databases.createStringAttribute(DB_ID, COLLECTIONS.VEHICLES.ID, 'model', 100, true);
        await databases.createStringAttribute(DB_ID, COLLECTIONS.VEHICLES.ID, 'licensePlate', 20, true);
        await databases.createStringAttribute(DB_ID, COLLECTIONS.VEHICLES.ID, 'photoId', 255, false);
        await databases.createStringAttribute(DB_ID, COLLECTIONS.VEHICLES.ID, 'cnhId', 255, false);
        await databases.createStringAttribute(DB_ID, COLLECTIONS.VEHICLES.ID, 'crlvId', 255, false);
        console.log(`- Atributos de "Vehicles" criados.`);
    } catch (error: any) {
        if (error.code === 409) {
            console.warn(`- Atributos para "Vehicles" já existem. Pulando.`);
        } else {
            throw error;
        }
    }
}

/**
 * Cria os atributos para a coleção de corridas.
 */
async function createRidesAttributes() {
    try {
        console.log(`- Configurando atributos para a coleção "Rides"...`);
        await databases.createStringAttribute(DB_ID, COLLECTIONS.RIDES.ID, 'passengerId', 50, true);
        await databases.createStringAttribute(DB_ID, COLLECTIONS.RIDES.ID, 'driverId', 50, true);
        await databases.createStringAttribute(DB_ID, COLLECTIONS.RIDES.ID, 'origin', 255, true);
        await databases.createStringAttribute(DB_ID, COLLECTIONS.RIDES.ID, 'destination', 255, true);
        await databases.createFloatAttribute(DB_ID, COLLECTIONS.RIDES.ID, 'value', true);
        await databases.createStringAttribute(DB_ID, COLLECTIONS.RIDES.ID, 'status', 50, true); // 'requested', 'accepted', 'in_progress', 'completed', 'canceled'
        await databases.createDatetimeAttribute(DB_ID, COLLECTIONS.RIDES.ID, 'requestedAt', true);
        await databases.createDatetimeAttribute(DB_ID, COLLECTIONS.RIDES.ID, 'completedAt', false);
        console.log(`- Atributos de "Rides" criados.`);
    } catch (error: any) {
        if (error.code === 409) {
            console.warn(`- Atributos para "Rides" já existem. Pulando.`);
        } else {
            throw error;
        }
    }
}


// --- Função Principal ---
async function setup() {
    console.log('Iniciando a configuração do Appwrite para o MobiCeolin...');

    try {
        // 1. Criar o banco de dados
        await databases.get(DB_ID);
        console.warn(`O banco de dados "${DB_NAME}" (${DB_ID}) já existe. Pulando.`);
    } catch (error: any) {
        if (error.code === 404) { // 404 Not Found
            console.log(`Criando banco de dados: ${DB_NAME}...`);
            await databases.create(DB_ID, DB_NAME);
            console.log(`Banco de dados "${DB_NAME}" criado com sucesso.`);
        } else {
            console.error('Erro fatal ao verificar o banco de dados. Verifique suas credenciais e a conexão com o Appwrite.', error.message);
            return; // Interrompe a execução
        }
    }

    // 2. Criar as coleções
    await createCollection(DB_ID, COLLECTIONS.USERS);
    await createCollection(DB_ID, COLLECTIONS.VEHICLES);
    await createCollection(DB_ID, COLLECTIONS.RIDES);

    // 3. Criar os atributos para cada coleção (aguarda a criação da coleção ser resolvida)
    // A API do Appwrite pode precisar de um momento para propagar a criação da coleção.
    console.log('\nAguardando um momento antes de criar os atributos...');
    await new Promise(resolve => setTimeout(resolve, 2000)); // 2 segundos de espera

    console.log('\nIniciando a criação dos atributos das coleções...');
    await createUsersAttributes();
    await createVehiclesAttributes();
    await createRidesAttributes();

    console.log('\n\n🚀 Configuração do Appwrite concluída com sucesso! 🚀');
    console.log('Seu backend está pronto para receber os dados da aplicação MobiCeolin.');
}

setup().catch(error => {
    console.error('\n❌ Ocorreu um erro durante a configuração. Verifique os logs acima.');
    process.exit(1);
});
