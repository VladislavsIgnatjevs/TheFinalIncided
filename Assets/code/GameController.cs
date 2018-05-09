using UnityEngine;
using System.Collections;

public class GameController : MonoBehaviour
{
	public GUIText scoreText;
	public GameObject player;
	
	private int score;
	private bool gameOver;
	private bool restart;
	private Vector3 playerSpawn;
	public Vector3 initialPlayerSpawn;
	
	void Start()
	{
		Instantiate(player, initialPlayerSpawn, player.transform.rotation);
	}
	void Update()
	{
		if(gameOver)
		{
			restart = true;
			
			if(restart)
			{
				restart = false;
				gameOver = false;

			}
		}
	}
	
	public void GameOver()
	{
		gameOver = true;
	}
	
	public void UpdatePlayerSpawn(Vector3 newPlayerSpawn)
	{
		playerSpawn = newPlayerSpawn + new Vector3(0, 1.0f, 0);
		Debug.Log (playerSpawn);
	}

}