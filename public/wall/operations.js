page=1
keyword=""
maxLimit=0
function search()
{
    keyword=document.getElementById("search").value
    url='https://www.omdbapi.com/?t='+keyword+'&apikey=16146057&page='+page
    $.ajax(
        {
            url:'https://www.omdbapi.com/?s='+keyword+'&apikey=16146057&page=1',
            method:"GET",
            dataType:'JSONP',
            success:res=>{
                url=res
                maxLimit=res.totalResults
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
  while(i<n)
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
    button.setAttribute("onclick","add('"+result.Search[0].imdbID+"')")
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