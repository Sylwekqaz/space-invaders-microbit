input.onLogoEvent(TouchButtonEvent.Touched, function () {
    BulletY = 3
    BulletX = 2
    led.plot(BulletX, BulletY)
    music.play(music.builtinPlayableSoundEffect(soundExpression.giggle), music.PlaybackMode.InBackground)
})
input.onButtonPressed(Button.A, function () {
    if (Player > 0) {
        led.unplot(Player, 4)
        Player += -1
        led.plot(Player, 4)
    }
})
input.onButtonPressed(Button.B, function () {
    if (Player < 4) {
        led.unplot(Player, 4)
        Player += 1
        led.plot(Player, 4)
    }
})
let BulletX = 0
let BulletY = 0
let Player = 0
Player += 2
BulletY += -1
led.plot(Player, 4)
loops.everyInterval(200, function () {
    if (BulletY != -1) {
        if (BulletY == 0) {
            led.unplot(BulletX, BulletY)
            BulletY += -1
        }
        led.unplot(BulletX, BulletY)
        BulletY += -1
        led.plot(BulletX, BulletY)
    }
})
