#pragma strict
//var enemy1 : GameObject;
//var enemy2 : GameObject;
public var score : int;
private var cam : GameObject;
private var lastPos : int;

function Start () {
//enemy1 = GameObject.Find("tank_monster");
//enemy2 = GameObject.Find("bulbman");
score = 0;
cam = GameObject.Find("Main Camera");


}

function Update () {
  if (cam == null)
    {
      cam = GameObject.Find("Main Camera");
    }
    if (lastPos < cam.transform.position.x-1)
    {
      score += 1;
    }
    
    lastPos = cam.transform.position.x;
    
    
//if (enemy1==null)
//  {
//     score += 20;
//     enemy1 = GameObject.Find("tank_monster(Clone)");
//  }
//if (enemy2==null)
//  {
//     score += 10;
//     enemy2 = GameObject.Find("bulbman(Clone)");
//  }  
  
  
}
function OnGUI()
{
  GUI.skin.label.fontSize = 30;
  GUI.Label(Rect(Screen.width*0.06,Screen.height*0.2,Screen.width*0.6,Screen.height*0.6), "score "+score);
  
}

//function scoringBulbman()
//{
//  score += 10;
//}
//
//function scoringTankMonster()
//{
//  score += 20;
//}