const express = require('express');
const app = express();
app.use(express.json());
app.use(express.urlencoded());
const port = 3000;
const user = [];
let negative = [];
const display = {};

function Lower(name, amount){
    const del = []
    let val = (amount * -1)
    for(let i=0; i<user.length;i++){
        if(user[i].payer==name){
            if(user[i].points>=val){
                user[i].points -= val
                if(user[i].points==0){
                    del.push(i);
                }
                break;
            }else{
                val = val - user[i].points
                del.push(i);
            }
        }
    }
    del.forEach(element => delete user[element]);
}

app.get('/', (req, res) => {
    user.filter(n => n)
    res.send(display)
});

app.post('/add', (req,res)=> {
    const player = {
        payer: req.body.name,
        points: req.body.points,
        timestamp: req.body.date
    };
    const name = player.payer;
    const amount = player.points;
    if(name in display){
        display[name] = display[name] + amount;
    }else{
        display[name] = amount;
    }
    if(amount < 1){
        negative.push(player)
    }else{
        user.push(player) 
    }
    res.send(player);
});

app.post('/spend', (req,res)=> {
    user.sort((a, b) => {
        let new_a = new Date(a.timestamp)
        let new_b = new Date(b.timestamp)
        return new_a.getTime() - new_b.getTime()
    });
    negative.forEach((payer) => {
        if(payer.points < 1){
            Lower(payer.payer,payer.points)
        }
    })
    negative = [];
    user.filter(n => n)
    let amount = req.body.points;
    const result = [];
    const del = [];
    for(let i=0; i<user.length;i++){
        const name = user[i].payer
        if(user[i].points >= amount){
            user[i].points -= amount;
            display[name] = display[name] -= amount;
            const value = {name: user[i].payer, points: (amount * -1)}
            if(user[i].points==0){
                del.push(i);
            }
            result.push(value);
            break;
        }else{
            amount -= user[i].points;
            display[name] = display[name] -= user[i].points;
            const value = {name: user[i].payer, points: (user[i].points * -1)}
            del.push(i);
            result.push(value);
        }
    }
    del.forEach(element => delete user[element]);
    res.send(result);
});

app.listen(port, () => console.log(`App listening on port ${port}!`));
