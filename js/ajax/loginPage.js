function loadRegisterForm(){
    var formContainer = document.getElementById("form-container");
    if(formContainer != null){
        var form = formContainer.getElementsByTagName("form")[0];
        form.remove();
        var div = formContainer.getElementsByTagName("div")[0];
        div.remove();
        createRegisterForm(formContainer);
        createLoginAnchor(formContainer);
    }
}

function loadLoginForm(){
    var formContainer = document.getElementById("form-container");
    if(formContainer != null){
        formContainer.getElementsByTagName("form")[0].remove();
        formContainer.getElementsByTagName("div")[0].remove();
        createLoginForm(formContainer);
        createRegisterAnchor(formContainer);
    }
}

function createRegisterForm(formContainer){
    var form = document.createElement("form");
    form.setAttribute("action","./php/register.php");
    form.setAttribute("method","post");
    form.setAttribute("onsubmit","javascript:return sendForm(event);");
    var username = createUsernameInput();
    var password = createPasswordInput();
    var verifyPassword = createVerifyPassword();
    var button = createSubmitInput("registra");
    form.appendChild(username);
    form.appendChild(password);
    form.appendChild(verifyPassword);
    form.appendChild(button);
    formContainer.appendChild(form);
}

function createLoginForm(formContainer){
    var form = document.createElement("form");
    form.setAttribute("action","./php/login.php");
    form.setAttribute("method","post");
    form.setAttribute("onsubmit","javascript:return sendForm(event);");
    var username = createUsernameInput();
    var password = createPasswordInput();
    var button = createSubmitInput("login");
    form.appendChild(username);
    form.appendChild(password);
    form.appendChild(button);
    formContainer.appendChild(form);
}

function createLoginAnchor(formContainer){
    var div = document.createElement("div");
    div.setAttribute("id","login-link");
    appendLink(div, "sei già registrato? ", "login", "javascript:void(0);","click", loadLoginForm);
    formContainer.appendChild(div);
}
function createRegisterAnchor(formContainer){
    var div = document.createElement("div");
    div.setAttribute("id","register-link");
    appendLink(div, "non sei ancora registrato? ", "crea un nuovo account", "javascript:void(0);","click", loadRegisterForm);
    formContainer.appendChild(div);
}



function createUsernameInput(){
    var label = document.createElement("label");
    label.setAttribute("for","username");
    label.textContent = "Username";
    var username = document.createElement("input");
    username.setAttribute("type","text");
    username.setAttribute("id","username");
    username.setAttribute("maxlength","32");
    username.setAttribute("pattern", "[a-zA-Z0-9]+");
    username.setAttribute("required","required");
    username.setAttribute("autofocus","autofocus");
    username.setAttribute("name","username");
    username.setAttribute("placeholder","username");
    label.appendChild(username);
    return label;
}

function createPasswordInput(){
    var label = document.createElement("label");
    label.setAttribute("for","password");
    label.textContent = "Password";
    var password = document.createElement("input");
    password.setAttribute("id","password");
    password.setAttribute("maxlength","32");
    password.setAttribute("pattern","[a-zA-Z0-9]+");
    password.setAttribute("type","password");
    password.setAttribute("required","required");
    password.setAttribute("name","password");
    password.setAttribute("placeholder","password");
    label.appendChild(password);
    return label;
}
function createButtonInput(value){
    var button = document.createElement("input");
    button.setAttribute("value",value);
    button.setAttribute("type","button");
    return button;
}
function createSubmitInput(value){
    var button = document.createElement("input");
    button.setAttribute("value",value);
    button.setAttribute("type","submit");
    return button;
}
function createVerifyPassword(){
    var label = document.createElement("label");
    label.setAttribute("for","confirmpassword");
    label.textContent ="Conferma Password";
    var confirm = document.createElement("input");
    confirm.setAttribute("id","confirmpassword");
    confirm.setAttribute("maxlength","32");
    confirm.setAttribute("pattern","[a-zA-Z0-9]+");
    confirm.setAttribute("type","password");
    confirm.setAttribute("required","required");
    confirm.setAttribute("name","confirmpassword");
    confirm.setAttribute("placeholder","conferma password");
    confirm.setAttribute("onKeyUp","confirmPassword()");
    label.appendChild(confirm);
    return label;
}

function confirmPassword(){
    var password = document.getElementsByName("password")[0];
    var confirm = document.getElementsByName("confirmpassword")[0];
    if(password.value !== confirm.value)
        confirm.setCustomValidity("la password non corrisponde");
    else
        confirm.setCustomValidity("");

}

function sendForm(e){
    e.preventDefault();
    var form =  document.getElementsByTagName("form")[0];
    var param;
    var obj = {
        "username": form.elements[0].value,
        "password": form.elements[1].value
    };
    param = JSON.stringify(obj);
    var method = form.method;
    var url = form.action;
    AjaxManager.performAjaxRequest(method, url,true, param, formResponse )
}

function formResponse(response){
    var container = document.getElementById("form-container");
    if(response.responseCode === 0){
        container.innerHTML="";
        var p1 = document.createElement("p");
        p1.appendChild(document.createTextNode(response.message));
        container.appendChild(p1);
        var b1 = createButtonInput("CLASSICA");
        b1.setAttribute("class","play-button");
        b1.dataset.mode = "0";
        var b2 = createButtonInput("DIFFICILE");
        b2.setAttribute("class","play-button");
        b2.dataset.mode = "1";
        var b3 = createButtonInput("MULTIPLAYER");
        b3.setAttribute("class","play-button");
        b3.dataset.mode = "2";
        container.appendChild(b1);
        container.appendChild(b2);
        container.appendChild(b3);
        initializeButtons();
        appendLink(container, "effettua il ", "logout", "./php/logout.php", null, null);
        appendLink(container, "oppure ", "cancella il tuo account", "./php/delete.php", null, null);
    }
    else{
        var p = document.createElement("p");
        p.textContent = response.message;
        p.style.color ="red";
        container.appendChild(p);
        setTimeout(function(){
            container.removeChild(p);
        }, 5000);
    }
}

function appendLink(container, paragraph, linktext, href, event, eventHandler){
    var p = document.createElement("p");
    var a = document.createElement("a");
    p.appendChild(document.createTextNode(paragraph));
    a.appendChild(document.createTextNode(linktext));
    a.setAttribute("href",href);
    if(event !== null)
        a.addEventListener(event, eventHandler);
    p.appendChild(a);
    container.appendChild(p);
}

function appendHomeButton(container){
    var a = document.createElement("a");
    var img = document.createElement("img");
    img.src = "./img/home.png";
    img.alt = "home";
    a.href = "./index.php";
    img.className = "home-button";
    a.appendChild(img);
    container.appendChild(a);
}