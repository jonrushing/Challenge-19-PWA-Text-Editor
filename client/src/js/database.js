import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  const jateDb = await openDB('jate', 1);

  const tx = jateDb.transaction('jate', 'readwrite');
  const store = tx.objectStore('jate');
  const request = store.put({
    id: 1,
    todo: content
  });
  const result = await request;
  console.log('result.value', result);
  return result;
}
// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  console.log('GET all from the database');

  const jateDb = await openDB('jate', 1);

  const tx = jateDb.transaction('jate', 'readonly');

  const store = tx.objectStore('jate');

  const request = store.getAll();

  const result = await request;
  console.log('result.value', result);
  return result.value;
};

initdb();


// // Export a function we will use to POST to the database.
// export const postDb = async (content) => {
//   console.log('Post to the ase');

//   // Create a connection to the database database and version we want to use.
//   const todosDb = await openDB('todos', 1);

//   // Create a new transaction and specify the database and data privileges.
//   const tx = todosDb.transaction('todos', 'readwrite');

//   // Open up the desired object store.
//   const store = tx.objectStore('todos');

//   // Use the .add() method on the store and pass in the content.
//   const request = store.add({ todo: content });

//   // Get confirmation of the request.
//   const result = await request;
//   console.log('🚀 - data saved to the database', result);
// };

// // Export a function we will use to GET all from the database.
// export const getAllDb = async () => {
//   console.log('GET all from the database');

//   // Create a connection to the database database and version we want to use.
//   const todosDb = await openDB('todos', 1);

//   // Create a new transaction and specify the database and data privileges.
//   const tx = todosDb.transaction('todos', 'readonly');

//   // Open up the desired object store.
//   const store = tx.objectStore('todos');

//   // Use the .getAll() method to get all data in the database.
//   const request = store.getAll();

//    // Get confirmation of the request.
//   const result = await request;
//   console.log('result.value', result);
//   return result;
// };

// // Export a function we will use to GET from the database.
// export const getOneDb = async (id) => {
//   console.log('GET from the database');

//   // Create a connection to the database database and version we want to use.
//   const todosDb = await openDB('todos', 1);

//    // Create a new transaction and specify the database and data privileges.
//   const tx = todosDb.transaction('todos', 'readonly');

//   // Open up the desired object store.
//   const store = tx.objectStore('todos');

//    // Use the .get() method to get a piece of data from the database based on the id.
//   const request = store.get(id);

//   // Get confirmation of the request.
//   const result = await request;
//   console.log('result.value', result);
//   return result;
// };
