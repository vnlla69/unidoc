// app.js - Integration script for UNIDOCCS website

document.addEventListener('DOMContentLoaded', function() {
    // Load documents if on the main page
    if (window.location.pathname === '/' || window.location.pathname === '/index.html') {
        loadDocuments();
    }
});

// Document upload function
function uploadDocument(title, description, fileType) {
    // In a real implementation, this would upload to blockchain
    console.log('Document uploaded:', {title, description, fileType});
    return {
        id: Date.now().toString(),
        title,
        description,
        type: fileType,
        uploadDate: new Date().toISOString(),
        blockchainId: 'bc' + Math.random().toString(36).substring(2, 10)
    };
}

// Load user documents
function loadDocuments() {
    const documentsSection = document.querySelector('.documents-section');
    
    if (!documentsSection) return;
    
    // Clear existing documents except the h2 title
    const title = documentsSection.querySelector('h2');
    documentsSection.innerHTML = '';
    if (title) documentsSection.appendChild(title);
    
    // Add sample documents
    const sampleDocs = [
        uploadDocument('Sample Document 1', 'This is a sample document to demonstrate the functionality', 'PDF'),
        uploadDocument('Sample Document 2', 'Another sample document with different content', 'DOCX'),
        uploadDocument('Sample Image', 'Demonstration of image upload capability', 'JPG')
    ];
    
    sampleDocs.forEach(doc => {
        const docCard = document.createElement('div');
        docCard.className = 'document-card';
        docCard.innerHTML = `
            <h4>${doc.title}</h4>
            <p>${doc.description}</p>
            <div class="document-meta">
                <span>Type: ${doc.type}</span> |
                <span>Uploaded: ${new Date(doc.uploadDate).toLocaleDateString()}</span> |
                <span>Blockchain ID: ${doc.blockchainId}</span>
            </div>
        `;
        
        documentsSection.appendChild(docCard);
    });
    
    // Add upload document button
    const uploadBtn = document.createElement('div');
    uploadBtn.className = 'document-card upload-btn';
    uploadBtn.innerHTML = `
        <h4>Upload New Document</h4>
        <p>Click to add a new document to the blockchain</p>
    `;
    uploadBtn.style.cursor = 'pointer';
    uploadBtn.style.display = 'flex';
    uploadBtn.style.flexDirection = 'column';
    uploadBtn.style.alignItems = 'center';
    uploadBtn.style.justifyContent = 'center';
    uploadBtn.style.borderStyle = 'dashed';
    
    uploadBtn.addEventListener('click', function() {
        showUploadModal();
    });
    
    documentsSection.appendChild(uploadBtn);
}

// Show upload document modal
function showUploadModal() {
    // Create modal if it doesn't exist
    let uploadModal = document.getElementById('uploadModal');
    
    if (!uploadModal) {
        uploadModal = document.createElement('div');
        uploadModal.className = 'modal-overlay';
        uploadModal.id = 'uploadModal';
        
        uploadModal.innerHTML = `
            <div class="login-modal">
                <button class="modal-close" id="closeUploadModal">&times;</button>
                <h2>Upload Document</h2>
                
                <form id="uploadForm">
                    <div class="form-group">
                        <label for="docTitle">Document Title</label>
                        <input type="text" id="docTitle" required>
                    </div>
                    
                    <div class="form-group">
                        <label for="docDescription">Description</label>
                        <textarea id="docDescription" required style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 4px;"></textarea>
                    </div>
                    
                    <div class="form-group">
                        <label for="docType">Document Type</label>
                        <select id="docType" style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 4px;">
                            <option value="PDF">PDF</option>
                            <option value="DOCX">Word Document</option>
                            <option value="JPG">Image</option>
                            <option value="Certificate">Certificate</option>
                        </select>
                    </div>
                    
                    <div class="form-group">
                        <label for="docFile">Upload File</label>
                        <input type="file" id="docFile" style="width: 100%;">
                        <small style="color: #7f8c8d;">Note: Files are not actually uploaded in this demo.</small>
                    </div>
                    
                    <button type="submit" class="submit-btn" style="width: 100%;">Upload to Blockchain</button>
                </form>
            </div>
        `;
        
        document.body.appendChild(uploadModal);
        
        // Close button event
        document.getElementById('closeUploadModal').addEventListener('click', function() {
            uploadModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        });
        
        // Form submission
        document.getElementById('uploadForm').addEventListener('submit', function(e) {
            e.preventDefault();
            
            const title = document.getElementById('docTitle').value;
            const description = document.getElementById('docDescription').value;
            const type = document.getElementById('docType').value;
            
            if (title && description) {
                uploadDocument(title, description, type);
                uploadModal.style.display = 'none';
                document.body.style.overflow = 'auto';
                loadDocuments(); // Refresh documents list
            }
        });
    }
    
    // Show modal
    uploadModal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}