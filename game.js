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
    this.time = 0;
  }
  update() {
    this.time += .1;
    this.gameObject.y = -this.time;
    this.gameObject.x = Math.sin(this.time/2) * .5;
    if (this.gameObject.y < -20)
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
    let object = Base.SceneManager.currentScene.instantiate(Base.Prefabs.Circle, new Base.Point(0, 0), new Base.Point(.05, .05))
    let behavior = new BallBehavior();
    object.addComponent(behavior);
    behavior.start();
    let letter = Base.SceneManager.currentScene.instantiate(Base.Prefabs.Text, new Base.Point(0, 0), new Base.Point(2, 2), 0, object);
    let textComponent = letter.getComponent("TextComponent");
    textComponent.text = "p";
  }
}


let GameBehaviors = {
  BallBehavior,
  SpawnerBehavior,
}

Base.main({}, GameBehaviors, Scenes);