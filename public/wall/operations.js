page=1
keyword=""
maxLimit=0
existPlaylist=""
uname=getInfo()

function search()
{
    keyword=document.getElementById("search").value
    keyword=keyword.replaceAll(' ','+')
    url='https://www.omdbapi.com/?t='+keyword+'&apikey=16146057&page='+page
    $.ajax(
        {
            url:'https://www.omdbapi.com/?s='+keyword+'&apikey=16146057&page=1',
            method:"GET",
            dataType:'JSONP',
            success:res=>{
                url=res
                maxLimit=Math.floor(res.totalResults/10)
                if(maxLimit%10!=0)
                maxLimit++
                console.log(res)
                appendResult(res)
            }
        }
    )
}

function nextPage()
{
  if(page==maxLimit)
  return
  page++
  url='https://www.omdbapi.com/?t='+keyword+'&apikey=16146057&page='+page
  $.ajax(
      {
          url:'https://www.omdbapi.com/?s='+keyword+'&apikey=16146057&page='+page,
          method:"GET",
          dataType:'JSONP',
          success:res=>{
              url=res
              console.log(res)
              appendResult(res)
          },
          error:res=>{
            page--;
          }
      }
  )
}


function prevPage()
{
  if(page==1)
  return;
  page--;
  url='https://www.omdbapi.com/?t='+keyword+'&apikey=16146057&page='+page
  $.ajax(
      {
          url:'https://www.omdbapi.com/?s='+keyword+'&apikey=16146057&page='+page,
          method:"GET",
          dataType:'JSONP',
          success:res=>{
              url=res
              console.log(res)
              appendResult(res)
          },
          error:res=>{
            page--;
          }
      }
  )
}




function appendResult(result)
{
  document.getElementById("parent-holder").innerHTML=""
  n=result.Search.length
  t=n
  i=0
  if(n/3>3)
  n=Math.floor(n/3)+1
  else
  n=Math.floor(n/3)
  p=0
  while(i<=n)
  { 
    var rowdiv=document.createElement("div")
    rowdiv.setAttribute("style","padding:2%")
    rowdiv.setAttribute("class","row")
    document.getElementById("parent-holder").appendChild(rowdiv)
    coldiv1=document.createElement("div")
    coldiv1.setAttribute("class","col-sm-4")
    coldiv1.setAttribute("id","row"+i+"col"+1)
    coldiv2=document.createElement("div")
    coldiv2.setAttribute("class","col-sm-4")
    coldiv2.setAttribute("id","row"+i+"col"+2)
    coldiv3=document.createElement("div")
    coldiv3.setAttribute("class","col-sm-4")
    coldiv3.setAttribute("id","row"+i+"col"+3)
    rowdiv.appendChild(coldiv1)
    rowdiv.appendChild(coldiv2)
    rowdiv.appendChild(coldiv3)
    c=1
    while(c<4&&p<t){
    cardclass=document.createElement("div")
    cardclass.setAttribute("class","card cardclass")
    cardheader=document.createElement("div")
    cardclass.appendChild(cardheader)
    cardheader.innerHTML=result.Search[p].Title+'('+result.Search[p].Year+')'
    cardheader.setAttribute("class","card-header")
    document.getElementById("row"+i+"col"+c).appendChild(cardclass)
    img=document.createElement("img")
    img.setAttribute("class","card-img-top")
    if(result.Search[p].Poster!='N/A')
    img.setAttribute("src",result.Search[p].Poster)
    else
    img.setAttribute("src","https://vishwaentertainers.com/wp-content/uploads/2020/04/No-Preview-Available.jpg")
    cardclass.appendChild(img)
    button=document.createElement("button")
    button.setAttribute("onclick","add('"+result.Search[p].imdbID+"')")
    button.setAttribute("data-toggle","modal")
    button.setAttribute("data-target","#myModal")
    button.setAttribute("class","add-button btn btn-danger")
    cardclass.appendChild(button)
    button.innerHTML='<center><i style="margin:1px;" class="fa fa-plus"></i></center>'
    button.setAttribute("style","float:right")
    c++
    p++
    if(p==t)
    {
      if(page>1)
      {
        prevButton=document.createElement("button")
        prevButton.setAttribute("class","prev-button btn")
        document.getElementById("row"+i+"col"+c).appendChild(prevButton)
        prevButton.innerHTML="<i class='fa fa-arrow-right'></i>&nbsp&nbspPrev page"
        prevButton.setAttribute('onclick','prevPage()')
      }
      nextButton=document.createElement("button")
      nextButton.setAttribute("class","next-button btn")
      document.getElementById("row"+i+"col"+c).appendChild(nextButton)
      nextButton.innerHTML="View more&nbsp&nbsp<i class='fa fa-arrow-right'></i>"
      nextButton.setAttribute('onclick','nextPage()')
    }
    }
    i++

  }
}


async function add(id)
{
    $.ajax(
    {
      url:'https://www.omdbapi.com/?i='+id+'&apikey=16146057&page=1&plot=full',
      method:'POST',
      dataType:'jsonp',
      success:async res=>{
           await getPlayList()
          if(res.Response=="False")
          alert("data not availaible")
          else
          {
            showData(res,id)
          }
      },
      error:res=>{
        alert("unable to get data on the movie third party error")
      }
    }
  )
}


function showData(result,id)
{
  document.getElementById("movie-title").innerHTML=result.Title
  document.getElementById("movie-poster").src=result.Poster
  document.getElementById("release").innerHTML=result.Released
  document.getElementById("running").innerHTML=result.Runtime
  document.getElementById("language").innerHTML=result.Language
  document.getElementById("plot").innerHTML=result.Plot
  document.getElementById("imdbID").innerHTML=id
}

function getPlayList()
{
  return new Promise((s,r)=>{
    $.ajax(
      {
        url:'/getPlayList',
        method:'POST',
        contentType:'application/json',
        data:JSON.stringify({
          uname:uname,
          home:"false"
        }),
        success:res=>{
          console.log(res)
            if(res=="error"){
            alert("playlist server error occured")
              s()
          }
            else
            {
              if(res=='empty')
              {
                existPlaylist=false
                document.getElementById("listoption").style.display="none"
                s()
              }
              else
              { 
               existPlaylist=true
                select=document.getElementById("playlists")
               document.getElementById("playlists").innerHTML=""
               document.getElementById("listoption").style.display="block"
               for(i=0;i<res.length;i++)
               {
                  option=document.createElement("option")
                  option.setAttribute("value",res[i].S_ID)
                  option.innerHTML=res[i].playlist_name
                  select.appendChild(option)
               }
               s()
              }
            }
        },
        error:res=>{
          alert("playlist error occured")
          s()
        }
      }
    )
  })  
}

async function addToPlayList()
{
  playlist=document.getElementById("playlists").value
  id=document.getElementById("imdbID").innerHTML
  if(!existPlaylist)
    {
      alert("please create a playlist before proceeding")
      return;
    }
    else
    {
        $.ajax({
          url:'/addData',
          method:'POST',
          contentType:'application/json',
          data:JSON.stringify(
            {
              playlist_id:playlist,
              imdbID:id
            }),
            success:res=>{
                if(res=="error")
                  alert("list addition server error")
                else
                {
                  alert("successfully added to playlist")
                }
            },
            error:res=>{
              console.log(res)
              alert("list addition error")
            }
        })
    }
}


function addList()
{
  list=document.getElementById("set-playlist").value
  type=document.getElementById("type").value
  $.ajax({
    url:'/addList',
    method:'POST',
    contentType:"application/json",
    data:JSON.stringify({
      uname:uname,
      list_name:list,
      value:type
    }),
    success:async res=>{
      if(res=="error")
      alert("list add server error")
      else
      {
        alert("playlist created successfully")
        if(!existPlaylist){
          existPlaylist=true
        }
        
          await getPlayList()
      }
    },
    error:res=>{
      console.log("playlist request failed")
    }
  })
}

function remove()
{
    toggleli()
    div=document.getElementById("modal")
    div.style.display="none"
}


async function startCreate()
{
  document.getElementById("parent-content-holder-create").style.display="block";
  document.getElementById("parent-content-holder-home").style.display="none"
}
async function startHome()
{
  document.getElementById("parent-content-holder-create").style.display="none";
  document.getElementById("parent-content-holder-home").style.display="block"
  await attachLists("public")
}

function attachLists(type)
{
  return new Promise((s,r)=>{
    $.ajax(
      {
        url:'/getPlayList',
        method:'POST',
        contentType:'application/json',
        data:JSON.stringify(
          {
            uname:uname,
            type:type,
            home:"true"
          }
        ),
        success:res=>{
            if(res=="error")
            {
              alert("list fetch server error occured")
              s("error")
            }
            else
            {
                select=document.getElementById("list-no")
                select.innerHTML=""
               for(i=0;i<res.length;i++)
               {
                  option=document.createElement("option")
                  option.setAttribute("value",res[i].S_ID)
                  option.innerHTML=res[i].playlist_name
                  select.appendChild(option)
               }
               s()
            }
        },
        error:res=>{
          console.log(res)
          alert("list fetch error")
          s("error")
        }
      }
    )
  })
}
function getListData()
{
  list_no=document.getElementById("list-no").value
  if(list_no=='-1')
  {
    alert("please select a playlist to proceed")
    return
  }
    $.ajax(
      {
        url:'/getListData',
        method:'POST',
        contentType:'application/json',
        data:JSON.stringify(
          {
            uname:uname,
            list:list_no,
          }
        ),
        success:res=>{
            if(res=="error")
            {
              alert("list fetch server error occured")
            }
            else
            {
              console.log(res)
              appendPublic(res)
            }
        },
        error:res=>{
          console.log(res)
          alert("list fetch error")
        }
      }
    )
  
}


async function appendPublic(result1)
{
  console.log(result1.length)
  var vresult=[]
  for(i=0;i<result1.length;i++)
  {
  await getimdbData(result1[i].imdbID).then(data=>{
      if(data=="error")
      {
        alert("alert occured 233")
      }
      else
      {
          vresult.push(data)
      }
  })
}
  document.getElementById("parent-holder1").innerHTML=""
  n=vresult.length
  t=n
  i=0
  if(n/3>3)
  n=Math.floor(n/3)+1
  else
  n=Math.floor(n/3)
  p=0
  while(i<=n)
  { 
    var rowdiv=document.createElement("div")
    rowdiv.setAttribute("style","padding:2%")
    rowdiv.setAttribute("class","row")
    document.getElementById("parent-holder1").appendChild(rowdiv)
    coldiv1=document.createElement("div")
    coldiv1.setAttribute("class","col-sm-4")
    coldiv1.setAttribute("id","row"+i+"col"+1)
    coldiv2=document.createElement("div")
    coldiv2.setAttribute("class","col-sm-4")
    coldiv2.setAttribute("id","row"+i+"col"+2)
    coldiv3=document.createElement("div")
    coldiv3.setAttribute("class","col-sm-4")
    coldiv3.setAttribute("id","row"+i+"col"+3)
    rowdiv.appendChild(coldiv1)
    rowdiv.appendChild(coldiv2)
    rowdiv.appendChild(coldiv3)
    c=1
    while(c<4&&p<t){
    cardclass=document.createElement("div")
    cardclass.setAttribute("class","card cardclass")
    cardheader=document.createElement("div")
    cardclass.appendChild(cardheader)
    cardheader.innerHTML=vresult[p].Title+'('+vresult[p].Year+')'
    cardheader.setAttribute("class","card-header")
    document.getElementById("row"+i+"col"+c).appendChild(cardclass)
    img=document.createElement("img")
    img.setAttribute("class","card-img-top")
    if(vresult[p].Poster!='N/A')
    img.setAttribute("src",vresult[p].Poster)
    else
    img.setAttribute("src","https://vishwaentertainers.com/wp-content/uploads/2020/04/No-Preview-Available.jpg")
    cardclass.appendChild(img)
    button=document.createElement("button")
    button.setAttribute("onclick","add('"+result1[p].imdbID+"')")
    button.setAttribute("data-toggle","modal")
    button.setAttribute("data-target","#myModal")
    button.setAttribute("class","add-button btn btn-danger")
    cardclass.appendChild(button)
    button.innerHTML='<center><i style="margin:1px;" class="fa fa-plus"></i></center>'
    button.setAttribute("style","float:right")
    c++
    p++
    if(p==t)
    {
      if(page>1)
      {
        prevButton=document.createElement("button")
        prevButton.setAttribute("class","prev-button btn")
        document.getElementById("row"+i+"col"+c).appendChild(prevButton)
        prevButton.innerHTML="<i class='fa fa-arrow-right'></i>&nbsp&nbspPrev page"
        prevButton.setAttribute('onclick','prevPage()')
      }
      nextButton=document.createElement("button")
      nextButton.setAttribute("class","next-button btn")
      document.getElementById("row"+i+"col"+c).appendChild(nextButton)
      nextButton.innerHTML="View more&nbsp&nbsp<i class='fa fa-arrow-right'></i>"
      nextButton.setAttribute('onclick','nextPage()')
    }
    }
    i++

  }
}


function getimdbData(id)
{
  console.log(id)
  return new Promise((s,r)=>{
    $.ajax(
      {
        url:'https://www.omdbapi.com/?i='+id+'&apikey=16146057&page=1&plot=full',
        method:'POST',
        dataType:'jsonp',
        success:async res=>{
            if(res.Response=="False"){
            alert("data not availaible")
              s("error")
          }
            else
            {
              s(res)
            }
        },
        error:res=>{
          alert("unable to get data on the movie third party error")
          s("error")
        }
      }
    )
  })
  
}