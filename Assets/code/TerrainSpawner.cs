using UnityEngine;
using System.Collections;

public class TerrainSpawner : MonoBehaviour
{
    //terrain IDs for terrains
	public GameObject easyTerrain;
	public GameObject mediumTerrain;
	public GameObject hardTerrain;

	public GameObject enemy1;
	public GameObject enemy2;
	
	// starting position for terrain, number found from tweaking in the editor
	public float startSpawnPosX = 79.95f;
	// y position that all terrain will be spawned
	// my terrain is all joined at the same level
	// you can change this if here and the spawn method
	// if you need terrain at different heights
	public int spawnYPos = 0;
	//spawning enemy1

	public float enemy1SpawnPosX = 110.55f;
	public int enemy1SpawnPosY = 6;
	//spawning enemy2
	public float enemy2SpawnPosX = 120.55f;
	public int enemy2SpawnPosY = 6;

	public float nextSpawnPosX = 79.95f;

	public float enemy1NextSpawnPosX = 79.95f;
	public float enemy2NextSpawnPosX = 79.95f;
	
	// random number that is used for selecting the terrain
	int randomChoice;
	// keep track of the last position terrain was generated
	//keep track of the last position enemies were generated
	float lastPosition;
	float enemy1LastPosition;
	float enemy2LastPosition;
	// camera reference
	GameObject cam;
	// used to check if terrain can be generated depending on the camera position and lastposition
	bool canSpawn = true;
	
	void Start()
	{   
	
		// make the lastposition start at start spawn position
		lastPosition = startSpawnPosX;
		//for enemies
		enemy1LastPosition = enemy1SpawnPosX;
		enemy2LastPosition = enemy1SpawnPosX;
		// pair camera to camera reference
		cam = GameObject.Find("Main Camera");

	}
	
	void Update()
	{
		// if the camera is farther than the number last position minus 16 terrain is spawned
		// a lesser number may make the terrain 'pop' into the scene too early
		// showing the player the terrain spawning which would be unwanted
		if (cam.transform.position.x >= lastPosition - 68 && canSpawn == true)
		{
			// turn off spawning until ready to spawn again
			canSpawn = false;
			// we choose the random number that will determine what terrain is spawned
			randomChoice = Random.Range(1, 10);
			// SpawnTerrain is called and passed the randomchoice number
			SpawnTerrain(randomChoice);
		}
	}
	
	// spawn terrain based on the rand int passed by the update method
	void SpawnTerrain(int rand)
	{
		if (rand >= 1 && rand <= 4)
		{
			Instantiate(easyTerrain, new Vector3(lastPosition, spawnYPos, 0), Quaternion.Euler(0, 0, 0));
			// same as start spawn position as starting terrain
			// is the same length as the rest of the terrain prefabs
			//spawning enemies
			Instantiate(enemy1, new Vector3(enemy1LastPosition, enemy1SpawnPosY, 0), Quaternion.Euler(0, 0, 0));
			Instantiate(enemy2, new Vector3(enemy2LastPosition, enemy2SpawnPosY, 0), Quaternion.Euler(0, 0, 0));

			lastPosition += nextSpawnPosX;
			enemy1LastPosition +=enemy1NextSpawnPosX;
			enemy2LastPosition +=enemy2NextSpawnPosX;
		}
		
		if (rand >= 5 && rand <= 8)
		{
			Instantiate(mediumTerrain, new Vector3(lastPosition, spawnYPos, 0), Quaternion.Euler(0, 0, 0));

			Instantiate(enemy1, new Vector3(enemy1LastPosition, enemy1SpawnPosY, 0), Quaternion.Euler(0, 0, 0));
			Instantiate(enemy2, new Vector3(enemy2LastPosition, enemy2SpawnPosY, 0), Quaternion.Euler(0, 0, 0));
			
			lastPosition += nextSpawnPosX;
			enemy1LastPosition +=enemy1NextSpawnPosX;
			enemy2LastPosition +=enemy2NextSpawnPosX;
		}
		
		if (rand >= 9 && rand <= 10)
			// the platform terrain is more difficult to traverse
			// so we will lessen the chances of it spawning
		{
			Instantiate(hardTerrain, new Vector3(lastPosition, spawnYPos, 0), Quaternion.Euler(0, 0, 0));

			Instantiate(enemy1, new Vector3(enemy1LastPosition, enemy1SpawnPosY, 0), Quaternion.Euler(0, 0, 0));
			Instantiate(enemy2, new Vector3(enemy2LastPosition, enemy2SpawnPosY, 0), Quaternion.Euler(0, 0, 0));
			
			lastPosition += nextSpawnPosX;
			enemy1LastPosition +=enemy1NextSpawnPosX;
			enemy2LastPosition +=enemy2NextSpawnPosX;
		}
		
		// script is now ready to spawn more terrain
		canSpawn = true;
	}
}