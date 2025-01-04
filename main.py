def drawPlayer():
    led.plot(PlayerX, 4)
def drawAlien():
    if AlienX != -1:
        led.plot(AlienX, 0)
        led.plot(AlienX - 1, 0)
        led.plot(AlienX + 1, 0)
        led.plot(AlienX, 1)

def on_button_pressed_a():
    global PlayerX
    if PlayerX > 0:
        PlayerX += -1
input.on_button_pressed(Button.A, on_button_pressed_a)

def drawBullet():
    if BulletY != -1:
        led.plot(BulletX, BulletY)
def drawEvetything():
    basic.clear_screen()
    drawPlayer()
    drawAlien()
    drawBullet()

def on_button_pressed_b():
    global PlayerX
    if PlayerX < 4:
        PlayerX += 1
input.on_button_pressed(Button.B, on_button_pressed_b)

def onAlienDie():
    global AlienSpawnTime
    AlienSpawnTime = input.running_time() + 1000

def on_logo_touched():
    global BulletY, BulletX
    BulletY = 3
    BulletX = PlayerX
    music.play(music.builtin_playable_sound_effect(soundExpression.giggle),
        music.PlaybackMode.IN_BACKGROUND)
input.on_logo_event(TouchButtonEvent.TOUCHED, on_logo_touched)

BulletX = 0
AlienSpawnTime = 0
PlayerX = 0
BulletY = 0
AlienX = 0
AlienHP = 3
AlienX = 2
BulletY = -1
PlayerX = 2
AlienSpawnTime = -1

def on_every_interval():
    global AlienX
    # alien movement
    if AlienX == -1:
        pass
    elif AlienX == 0:
        AlienX += randint(0, 1)
    elif AlienX == 4:
        # alien movement
        AlienX += randint(0, -1)
    else:
        # alien movement
        AlienX += randint(-1, 1)
loops.every_interval(1500, on_every_interval)

def on_every_interval2():
    global AlienHP, AlienX, BulletY, AlienSpawnTime
    # Bullet movment
    if BulletY != -1:
        if BulletY == 0:
            # bullet hit
            if abs(AlienX - BulletX) <= 1:
                AlienHP += -1
                music.play(music.string_playable("A F G E - - - - ", 1200),
                    music.PlaybackMode.IN_BACKGROUND)
                # alien dies
                if AlienHP == 0:
                    AlienX = -1
                    onAlienDie()
            BulletY = -1
        BulletY += -1
    if AlienSpawnTime != -1 and input.running_time() > AlienSpawnTime:
        AlienHP = 3
        AlienX = 2
        AlienSpawnTime = -1
loops.every_interval(200, on_every_interval2)

def on_every_interval3():
    drawEvetything()
loops.every_interval(100, on_every_interval3)
