// UNIDOCCS Local Storage Backend

// Data models
const DataStore = {
    // Document model: {id, title, description, type, uploadDate, blockchainId}
  
    // Initialize the data store
    init() {
        if (!localStorage.getItem('unidoccs_documents')) {
            localStorage.setItem('unidoccs_documents', JSON.stringify([]));
        }
    },
  
    // Document methods
    documents: {
        getAll() {
            return JSON.parse(localStorage.getItem('unidoccs_documents') || '[]');
        },
        
        getById(id) {
            const documents = this.getAll();
            return documents.find(doc => doc.id === id);
        },
        
        create(documentData) {
            const documents = this.getAll();
            const blockchainId = 'bc' + Math.random().toString(36).substring(2, 10);
            const newDocument = {
                id: Date.now().toString(),
                uploadDate: new Date().toISOString(),
                blockchainId,
                ...documentData
            };
            documents.push(newDocument);
            localStorage.setItem('unidoccs_documents', JSON.stringify(documents));
            return newDocument;
        },
        
        update(id, documentData) {
            const documents = this.getAll();
            const index = documents.findIndex(doc => doc.id === id);
            if (index !== -1) {
                documents[index] = { ...documents[index], ...documentData };
                localStorage.setItem('unidoccs_documents', JSON.stringify(documents));
                return documents[index];
            }
            return null;
        },
        
        delete(id) {
            const documents = this.getAll();
            const filteredDocuments = documents.filter(doc => doc.id !== id);
            localStorage.setItem('unidoccs_documents', JSON.stringify(filteredDocuments));
        }
    }
};
  
// Initialize data store
DataStore.init();