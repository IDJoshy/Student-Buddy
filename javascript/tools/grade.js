export function GetGradeValues()
{
  let nmax = parseInt(document.getElementById("grade-tool-nmax").value);
  let nmin = parseInt(document.getElementById("grade-tool-nmin").value);
  let napr = parseInt(document.getElementById("grade-tool-napr").value);
  let e = parseInt(document.getElementById("grade-tool-e").value);
  let p = parseInt(document.getElementById("grade-tool-p").value);
  let pmax = parseInt(document.getElementById("grade-tool-pmax").value);

  CalculateGrade(nmax, nmin, napr, e, p, pmax);
}

function CalculateGrade(nmax, nmin, napr, e, p, pmax)
{
  if(p > pmax)
  { 
    Toastify({

      text: `!Puntaje superior a ${pmax}`,
      duration: 3000,
      gravity: "top",
      position: "right",
      stopOnFocus: true,
      style: {
      background: "linear-gradient(to right, #FF0000, #ff8478)",
      },

    }).showToast();
  }
  else
  {
    Toastify({

      text: `Tu nota es: ${MathGrade(nmax, nmin, napr, e, p, pmax)}`,
      duration: 3000,
      gravity: "top",
      position: "right",
      stopOnFocus: true,
      style: {
      background: "linear-gradient(to right, #00b09b, #96c93d)",
      },

    }).showToast();
  }
}

export function MathGrade(nmax, nmin, napr, e, p, pmax)
{
  let grade = 0;
  let e_normal = (e / 100);
  let e_confirm = (e_normal * pmax);

  try
  {
    if(p < e_confirm)
    {
      return (grade = (napr - nmin) * (p / (e_normal * pmax)) + nmin) * 100/100;
    }
    else if(p >= e_confirm)
    {
      return (grade = (nmax - napr) * ( (p - e_confirm) / (pmax * (1 - e_normal)) ) + napr) * 100/100;
    }
  }
  catch(e)
  {
    console.log(e); 
    return "error";
  }  

}