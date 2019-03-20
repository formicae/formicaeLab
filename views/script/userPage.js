function pageConfig(inp1, inp2){
    document.querySelector('#signupPage').className = inp1;
    document.querySelector('#userDataPage').className = inp2;
}

function showCreatePage(){
    pageConfig('showPage', 'hidePage')
}

function showUserDataPage(){
    pageConfig('hidePage', 'showPage')
}