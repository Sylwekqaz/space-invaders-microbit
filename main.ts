function drawPlayer () {
    led.plot(PlayerX, 4)
}
function drawAlien () {
    if (AlienX != -1) {
        led.plot(AlienX, 0)
        led.plot(AlienX - 1, 0)
        led.plot(AlienX + 1, 0)
        led.plot(AlienX, 1)
    }
}
input.onButtonPressed(Button.A, function () {
    if (PlayerX > 0) {
        PlayerX += -1
    }
})
function drawBullet () {
    if (BulletY != -1) {
        led.plot(BulletX, BulletY)
    }
}
function drawEvetything () {
    basic.clearScreen()
    drawPlayer()
    drawAlien()
    drawBullet()
}
input.onButtonPressed(Button.B, function () {
    if (PlayerX < 4) {
        PlayerX += 1
    }
})
function onAlienDie () {
    AlienSpawnTime = input.runningTime() + 1000
}
input.onLogoEvent(TouchButtonEvent.Touched, function () {
    BulletY = 3
    BulletX = PlayerX
    music.play(music.builtinPlayableSoundEffect(soundExpression.giggle), music.PlaybackMode.InBackground)
})
let BulletX = 0
let AlienSpawnTime = 0
let PlayerX = 0
let BulletY = 0
let AlienX = 0
let AlienHP = 3
AlienX = 2
BulletY = -1
PlayerX = 2
AlienSpawnTime = -1
loops.everyInterval(1500, function () {
    // alien movement
    if (AlienX == -1) {
    	
    } else if (AlienX == 0) {
        AlienX += randint(0, 1)
    } else if (AlienX == 4) {
        // alien movement
        AlienX += randint(0, -1)
    } else {
        // alien movement
        AlienX += randint(-1, 1)
    }
})
loops.everyInterval(200, function () {
    // Bullet movment
    if (BulletY != -1) {
        if (BulletY == 0) {
            // bullet hit
            if (Math.abs(AlienX - BulletX) <= 1) {
                AlienHP += -1
                music.play(music.stringPlayable("A F G E - - - - ", 1200), music.PlaybackMode.InBackground)
                // alien dies
                if (AlienHP == 0) {
                    AlienX = -1
                    onAlienDie()
                }
            }
            BulletY = -1
        }
        BulletY += -1
    }
    if (AlienSpawnTime != -1 && input.runningTime() > AlienSpawnTime) {
        AlienHP = 3
        AlienX = 2
        AlienSpawnTime = -1
    }
})
loops.everyInterval(100, function () {
    drawEvetything()
})
