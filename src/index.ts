import "reflect-metadata";
import {createConnection} from "typeorm";
import {Member} from "./entity/member";
const express = require("express");

let members;

function memberExists(memberID:number){
  let exists:boolean = false;
  members.forEach((member) => {
    if(member.id == memberID){
      exists = true;
    }
  });
  return exists;
}

createConnection({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "admin",
    password: "admin",
    database: "task03",
    entities: [
        Member
    ],
    synchronize: true,
    logging: false
}).then(async connection => {
  let app = express();

  app.get('/members',async (req,res)=>{
    members = await connection.manager.find(Member);
    res.status(200).send(members);
  });

  app.get('/members/member/:ID',async (req,res)=>{
    members = await connection.getRepository(Member);
    if(members.findOne(req.params.ID)){
      let targetMember = await member.findOne(req.params.ID);
      res.status(200).send(targetMember);
    }else{
      res.status(400).send("Wrong member ID!");
    }
  });

  app.use(express.json());
  app.post('/members/new',async (req,res) => {
    members = await connection.getRepository(Member);
    let body = req.body;
    let newMember = new Member(body.name,body.email,body.mobile,body.committee);
    connection.manager.save(newMember);
    res.status(200).send("Member added successfully!");
  });

  app.patch('/members/modify',async (req,res) => {
    members = await connection.getRepository(Member);
    let targetID: string = req.body.id;
    let targetMember = await members.findOne(targetID);
    if(req.body.name !== undefined){
      targetMember.name = req.body.name;
    }
    if(req.body.email !== undefined){
      targetMember.email = req.body.email;
    }
    if(req.body.mobile !== undefined){
      targetMember.mobile = req.body.mobile;
    }
    if(req.body.committee !== undefined){
      targetMember.committee = req.body.committee;
    }
    members.save(targetMember);
    res.status(200).send("Member Updated successfully!");
  });
  app.delete("/members/delete",async (req,res) => {
    members = await connection.getRepository(Member);
    if(members.findOne(req.body.id)){
      let targetMember = await members.findOne(req.body.id);
      members.remove(targetMember);
      res.status(200).send("Member Deleted successfully!");
    }else{
      res.status(400).send("This member doesn't exist!");
    }
  });
  app.listen(4444);

}).catch(error => console.log(error));
