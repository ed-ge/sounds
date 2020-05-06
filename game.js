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

let scale = .1;
let startY = -20;
let stopY = 30;

class BallBehavior extends Base.Behavior {
  start() {
    this.time = 0;
  }
  update() {
    this.time += .2;
    let y = -(this.time + startY);
    console.log(y);
    this.gameObject.y = y;
    this.gameObject.x = Math.sin(this.time/2) * .5;
    if(this.time < 1){
      this.gameObject.scaleX = this.time * scale;
      this.gameObject.scaleY = this.time * scale;
    }
    else if ( -y> stopY - 1){
      this.gameObject.scaleX = (stopY +y) * scale;
      this.gameObject.scaleY = (stopY + y) * scale;
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
    this.letters = ["1", "2", "3", "4", "5", "6", "7"]
    this.ticksSinceLastSpawn = 100;
  }
  update() {
    this.ticksSinceLastSpawn++;
    if (this.ticksSinceLastSpawn >= 125) {
      this.ticksSinceLastSpawn -= 125;
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
    textComponent.fill = "black"
    let number = Math.floor(Math.random() * this.letters.length);
    textComponent.text = this.letters[(this.nextLetter++)%this.letters.length];
    // textComponent.text = this.letters[number];
    
  }
}


let GameBehaviors = {
  BallBehavior,
  SpawnerBehavior,
}

Base.main({}, GameBehaviors, Scenes);