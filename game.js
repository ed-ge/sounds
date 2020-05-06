let Scenes = {
  startScene: "StartScene",
  allScenes: [
    {
      name: "StartScene",
      objects: [
        // {
        //   def: "Circle",
        //   componentValues: ["CircleComponent|radius| 10", "CircleComponent|fill|black"],
        //   components: ["BallBehavior"],
        //   children: [
        //     {
        //       def: "SubText,-5,5,Text",
        //       componentValues:["TextComponent|text|p", "TextComponent|fill|green"]
        //     }
        //   ]
        // },
        {
          def: "Spawner, EmptyGameObject",
          components: ["SpawnerBehavior"]
        },
        { def: "Camera, 0, 0, 10, 10, Camera", },
      ]
    }
  ]
}

class BallBehavior extends Base.Behavior {
  start() {

  }
  update() {
    this.gameObject.y -= .1;



  }
  onTouchEnd() {
    console.log("Touch end")
    Base.SceneManager.currentScene.destroy(this.gameObject);
    this.gameObject.y += 10;
    // this.gameObject.x += (Math.random() * 2 - 1) * this.scale;
    // this.gameObject.y += (Math.random() * 2 - 1) * this.scale;

    // this.gameObject.x = Math.max(-10, Math.min(this.gameObject.x, 10));
    // this.gameObject.y = Math.max(-10, Math.min(this.gameObject.y, 10));
  }
}

class SpawnerBehavior extends Base.Behavior {
  start() {
    this.ticksSinceLastSpawn = 100;
    
  }
  update() {
    this.ticksSinceLastSpawn++;
    if(this.ticksSinceLastSpawn >= 100)
    {
      this.ticksSinceLastSpawn -= 100;
      this.spawn();
    }
    

  }
  spawn(){
    let object = Base.SceneManager.currentScene.instantiate(Base.Prefabs.Circle, new Base.Point(0,0), new Base.Point(.05, .05))
    object.addComponent(new BallBehavior())
    let letter = Base.SceneManager.currentScene.instantiate(Base.Prefabs.Text, new Base.Point(0,0), new Base.Point(2,2), 0, object);
    let textComponent = letter.getComponent("TextComponent");
    textComponent.text = "p";
  }

}


let GameBehaviors = {

  BallBehavior,
  SpawnerBehavior, 
}

Base.main({}, GameBehaviors, Scenes);