const authForm = document.getElementById('authForm');
const signupFields = document.getElementById('signup-fields');
const formTitle = document.getElementById('form-title');
const submitBtn = document.getElementById('submitBtn');
const toggleMsg = document.getElementById('toggle-msg');
const messageBox = document.getElementById('message');

let isLogin = true;


document.addEventListener('click', (e) => {
    if (e.target && e.target.id === 'toggle-link') {
        e.preventDefault();
        isLogin = !isLogin;
        
        signupFields.classList.toggle('hidden');
        formTitle.innerText = isLogin ? 'Login to Account' : 'Create New Account';
        submitBtn.innerText = isLogin ? 'Sign In' : 'Register Now';
        
        toggleMsg.innerHTML = isLogin ? 
            `Don't have an account? <a href="#" id="toggle-link">Create one</a>` : 
            `Already have an account? <a href="#" id="toggle-link">Login here</a>`;
        
        
        messageBox.style.display = 'none';
    }
});

authForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // IMPORTANT: Agar local chala rahe ho to http://127.0.0.1:5000 use karein
    // Agar Render par deploy ho gaya hai, to apna Render URL yahan daalein
    //const BASE_URL = "http://127.0.0.1:5000"; 

    const url = isLogin 
        ? `${BASE_URL}/crm/api/v1/auth/signin`
        : `${BASE_URL}/crm/api/v1/auth/signup`;

    const userId = document.getElementById('userId').value;
    const password = document.getElementById('password').value;
    
    let payload = { userId, password };

    if (!isLogin) {
        payload.name = document.getElementById('name').value;
        payload.email = document.getElementById('email').value;
        payload.userType = document.getElementById('userType').value;
    }

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        const data = await response.json();

        if (response.ok) {
            showMessage(isLogin ? "Login Successful!" : "Registration Successful!", "success");
            if (isLogin && data.accessToken) {
                localStorage.setItem('token', data.accessToken);
            }
        } else {
            
            showMessage(data.message || "Failed to process request", "error");
        }
    } catch (error) {
        showMessage("Server connection failed. Check if backend is running.", "error");
    }
});

function showMessage(text, type) {
    messageBox.innerText = text;
    messageBox.className = `message ${type}`;
    messageBox.style.display = 'block';
}