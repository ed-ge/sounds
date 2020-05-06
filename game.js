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

let scale = .05;
let startY = 0;
let stopY = 20;

class BallBehavior extends Base.Behavior {
  start() {
    this.time = 0;
  }
  update() {
    this.time += .1;
    this.gameObject.y = -this.time;
    this.gameObject.x = Math.sin(this.time/2) * .5;
    if(this.time < 1){
      this.gameObject.scaleX = this.time * scale;
      this.gameObject.scaleY = this.time * scale;
    }
    else if (this.time > stopY - 1){
      this.gameObject.scaleX = (stopY - this.time) * scale;
      this.gameObject.scaleY = (stopY - this.time) * scale;
    }
    else{
      this.gameObject.scaleX = scale;
      this.gameObject.scaleY = scale;
    }
    if (this.gameObject.y < -stopY)
      this.end();
  }
  end() {
    Base.SceneManager.currentScene.destroy(this.gameObject);
  }
  onTouchEnd() {
    this.end();
  }
}

class SpawnerBehavior extends Base.Behavior {
  start() {
    this.nextLetter = 0;
    this.letters = ["p", "m", "x"]
    this.ticksSinceLastSpawn = 100;
  }
  update() {
    this.ticksSinceLastSpawn++;
    if (this.ticksSinceLastSpawn >= 100) {
      this.ticksSinceLastSpawn -= 100;
      this.spawn();
    }
  }
  spawn() {
    let object = Base.SceneManager.currentScene.instantiate(Base.Prefabs.Circle, new Base.Point(0, startY), new Base.Point(0, 0))
    object.getComponent("CircleComponent").fill = "orange"
    let behavior = new BallBehavior();
    object.addComponent(behavior);
    behavior.start();
    let letter = Base.SceneManager.currentScene.instantiate(Base.Prefabs.Text, new Base.Point(-12, 8), new Base.Point(2, 2), 0, object);
    let textComponent = letter.getComponent("TextComponent");
    textComponent.text = this.letters[(this.nextLetter++)%this.letters.length];
    
  }
}


let GameBehaviors = {
  BallBehavior,
  SpawnerBehavior,
}

Base.main({}, GameBehaviors, Scenes);