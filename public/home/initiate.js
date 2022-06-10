curr="login"
function initiate()
{
    document.getElementById("body").style.overflow="hidden"
    div=document.getElementById("modal")
    div.style.display="block"
    
}
function remove()
{
    toggleli()
    div=document.getElementById("modal")
    div.style.display="none"
}


function togglesu()
{
    document.getElementById("cnfpassword").style.display="block"
    document.getElementById("login-parent").style.backgroundColor="rgba(84, 33, 203,0.3)"
    document.getElementById("button").innerHTML="Signup"
    document.getElementById("button").setAttribute("onclick","signup()");
    document.getElementById("login").style.boxShadow="0px 0px"
    document.getElementById("signup").style.boxShadow="2px 2px white"
}


function toggleli()
{
    document.getElementById("cnfpassword").style.display="none"
    document.getElementById("login-parent").style.backgroundColor="rgb(224, 86, 164,0.3)"
    document.getElementById("button").innerHTML="Login"
    document.getElementById("button").setAttribute("onclick","login()");
    document.getElementById("signup").style.boxShadow="0px 0px"
    document.getElementById("login").style.boxShadow="2px 2px white"
}

function signup()
{
    uname=document.getElementById("uname").value
    password=document.getElementById("password").value
    cnfpassword=document.getElementById("cnfpassword").value
    if(!uname||!password||!cnfpassword)
    alert("please enter all fields")

    if(cnfpassword!=password)
    {
        alert("passwords do not match")
        return;
    }

    $.ajax(
        {
            url:'/signup',
            method:'POST',
            contentType:'application/json',
            data:JSON.stringify({
                uname:uname,
                password:password,
            }),
            success:(res)=>{
                if(res=="error")
                alert("error 1 occured")
                else
                alert("successfully registered")
            },
            error:(res)=>{
                alert("error 2 occured")
                console.log(res)
            }
        }
    )
}


function login()
{
    uname=document.getElementById("uname").value
    password=document.getElementById("password").value
    //cnfpassword=document.getElementById("cnfpassword").value
    $.ajax(
        {
            url:'/login',
            method:'POST',
            contentType:'application/json',
            data:JSON.stringify({
                uname:uname,
                password:password,
            }),
            success:(res)=>{
                if(res=="error")
                alert("error 1 occured")
                else
                {
                    window.location.href="http://localhost:3000/wall"
                }
            },
            error:(res)=>{
                alert("error 2 occured")
                console.log(res)
            }
        }
    )
}