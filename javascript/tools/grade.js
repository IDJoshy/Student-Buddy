export function ToolGradeCalculate()
{
  const nmax = parseInt(document.getElementById("grade-tool-nmax").value);
  const nmin = parseInt(document.getElementById("grade-tool-nmin").value);
  const napr = parseInt(document.getElementById("grade-tool-napr").value);
  const e = parseInt(document.getElementById("grade-tool-e").value);
  const p = parseInt(document.getElementById("grade-tool-p").value);
  const pmax = parseInt(document.getElementById("grade-tool-pmax").value);

  CalculateGrade(nmax, nmin, napr, e, p, pmax);
}

function CalculateGrade(nmax, nmin, napr, e, p, pmax)
{
  if(p > pmax)
  { 
    Toastify({

      text: `!Points Got must be less than Max Points: ${pmax}`,
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

      text: `Grade is: ${MathGrade(nmax, nmin, napr, e, p, pmax)}`,
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

  try
  {
    let e_normal = (e / 100);
    let e_confirm = (e_normal * pmax);

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