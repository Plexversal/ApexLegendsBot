
const config = require('./config.json');
const content = require('./content.json');
const snoowrap = require('snoowrap');
const fs = require("fs");
const moment = require("moment");
const dedent = require('dedent-js')

const r = new snoowrap({
  userAgent: `${config['reddit']['userAgent']}`,
  clientId: `${config['reddit']['clientId']}`,
  clientSecret: `${config['reddit']['clientSecret']}`,
  username: `${config['reddit']['username']}`,
  password: `${config['reddit']['password']}`
});

async function submissionStart(post) {
  (function loop() {
      var now = new Date();
      if (now.getDay() === 1 && now.getHours() === 12  && now.getMinutes() === 00) mondayPost();
      if (now.getDay() === 2 && now.getHours() === 12  && now.getMinutes() === 00) tuesdayPost();
      if (now.getDay() === 3 && now.getHours() === 12  && now.getMinutes() === 00) wednesdayPost();
      if (now.getDay() === 4 && now.getHours() === 12  && now.getMinutes() === 00) thursdayPost();
      if (now.getDay() === 5 && now.getHours() === 12  && now.getMinutes() === 00) fridayPost();

        async function mondayPost(){ 

          // checking if list is empty 
          if(content.contentLists.legendsList.length === 0){

            let legends = content.contentListsConstant.legendsList
            legends.forEach(e => content.contentLists.legendsList.push(e))

            fs.writeFile('content.json', content, (err) => {
              if (err) console.error(err);
            })
            console.log(`Empty list: LegendList, refilled from constant cache at: ${moment().format(`MMMM Do YYYY, h:mm:ss a`)}`)
          }

          var legendsRandom = content.contentLists.legendsList[Math.floor(Math.random() * content.contentLists.legendsList.length)]
          var MondayPost = {
            title: `Legend Monday: ${legendsRandom} | ${moment().format(`MMMM DD YYYY`)}`,
            text: dedent(`Welcome to Legend Monday! This discussion thread focuses specifically on a randomly chosen legend.\n
            Today's Legend discussion is focused around: **${legendsRandom}**!\n
            Discuss what you like or dislike about this Legend; how it compares to others; playstyle tips and techniques; or anything else that you think would be of value to discuss regarding **${legendsRandom}**.\n
            Moderation in daily threads is more relaxed, but please stay on topic, be respectful of others and remember our [rules](https://www.reddit.com/r/apexlegends/wiki/rules)\n
            \n---\nSuggestions or feedback for these daily posts? Message [Modmail](https://www.reddit.com/message/compose?to=%2Fr%2Fapexlegends)!`),
            sendReplies: false}

            r.getSubreddit("apexlegends").submitSelfpost({ title: MondayPost.title, text: MondayPost.text, sendReplies: MondayPost.sendReplies}).then(p => {

              console.log(p)
            }).catch(e => console.log(`Error on posting ${e}`))

            content.contentLists.legendsList.splice([content.contentLists.legendsList.indexOf(legendsRandom)], 1)
            fs.writeFile('content.json', JSON.stringify(content, null, 4), (err) => {
              if (err) console.error(err);
            })

            console.log(`Successfully posted Legend Monday at: ${moment().format(`MMMM Do YYYY, h:mm:ss a`)}`)

        }

        async function tuesdayPost(){

          var TuesdayPost = { 
            title: `Game and Update Discussion | ${moment().format(`MMMM DD YYYY`)}`,
            text: dedent(`Welcome to the Tuesday **Game and Update Discussion thread!** This thread is your place for specific discussion on any recent development updates and general thoughts on the state of the game.\n
            Discuss what you like or dislike about recent updates, any flaws or features you would like to see in-game, your thoughts on the game's current state and meta, and more! *Please note that this thread will be unstickied if there is an update released and all discussion of the update will be redirected to the megathread for that day*\n
            Moderation in daily threads is more relaxed, but please stay on topic, be respectful of others and remember our [rules](https://www.reddit.com/r/apexlegends/wiki/rules)\n
            \n---\nSuggestions or feedback for these daily posts? Message [Modmail](https://www.reddit.com/message/compose?to=%2Fr%2Fapexlegends)!`),
            sendReplies: false}
            r.getSubreddit("apexlegends").submitSelfpost({ title: TuesdayPost.title, text: TuesdayPost.text, sendReplies: TuesdayPost.sendReplies}).then(p => {
              console.log(p)
            }).catch(e => console.log(`Error on posting ${e}`))

            console.log(`Successfully posted Update Tuesday at: ${moment().format(`MMMM Do YYYY, h:mm:ss a`)}`)

        }

        async function wednesdayPost(){

          // checking if list is empty
          if(content.contentLists.weaponList.length === 0){

            let weapons = content.contentListsConstant.weaponList
            weapons.forEach(e => content.contentLists.weaponList.push(e))

            fs.writeFile('content.json', content, (err) => {
              if (err) console.error(err);
            })
            console.log(`Empty WEAPON list, refilled from constant cache at: ${moment().format(`MMMM Do YYYY, h:mm:ss a`)}`)
          }

          var weaponsRandom = content.contentLists.weaponList[Math.floor(Math.random() * content.contentLists.weaponList.length)]
          var WednesdayPost = {
            title: `Weapon Wednesday: ${weaponsRandom} | ${moment().format(`MMMM DD YYYY`)}`,
            text: dedent(`Welcome to **Weapon Wednesday!** This discussion thread focuses specifically on a randomly chosen weapon.\n
            Today's Weapon discussion is focused around: **${weaponsRandom}**!\n
            Discuss what you like or dislike about this weapon; how it compares to other weapons; your favorite skins; changes that you think would be beneficial; or anything else that you think would be of value to discuss regarding the **${weaponsRandom}**.\n
            Moderation in daily threads is more relaxed, but please stay on topic, be respectful of others and remember our [rules](https://www.reddit.com/r/apexlegends/wiki/rules)\n
            \n---\nSuggestions or feedback for these daily posts? Message [Modmail](https://www.reddit.com/message/compose?to=%2Fr%2Fapexlegends)!`),
            sendReplies: false}

            r.getSubreddit("apexlegends").submitSelfpost({ title: WednesdayPost.title, text: WednesdayPost.text, sendReplies: WednesdayPost.sendReplies}).then(p => {
              console.log(p)
            }).catch(e => console.log(`Error on posting ${e}`))

            content.contentLists.weaponList.splice([content.contentLists.weaponList.indexOf(weaponsRandom)], 1)
            fs.writeFile('content.json', JSON.stringify(content, null, 4), (err) => {
              if (err) console.error(err);
            })

            console.log(`Successfully posted Weapon Wednesday at: ${moment().format(`MMMM Do YYYY, h:mm:ss a`)}`)

        }

        async function thursdayPost(){

          // checking if list is empty
          if(content.contentLists.ascensionList.length === 0){

            let landing = content.contentListsConstant.ascensionList
            landing.forEach(e => content.contentLists.ascensionList.push(e))

            fs.writeFile('content.json', content, null, 4, (err) => {
              if (err) console.error(err);
            })
            console.log(`Empty Ascension list, refilled from constant cache at: ${moment().format(`MMMM Do YYYY, h:mm:ss a`)}`)
          }

            var landingRandom = content.contentLists.ascensionList[Math.floor(Math.random() * content.contentLists.ascensionList.length)]
            var ThursdayPost = {
              title: `Landing spot Thursday | ${moment().format(`MMMM DD YYYY`)}`,
              text: dedent(`Welcome to Landing Spot Thursday! This thread is your place for specific discussion for today's randomly chosen landing spot or map area.\n
              Today's Landing Spot discussion is focused around: **${landingRandom}**!\n
              Discuss what you like or dislike about this landing spot; advantages or disadvantages of the location; how it compares to other spots; where to go after hitting this spot; the loot table; fun dev surprises hidden around the area; or anything else you think would be of value to discuss regarding ${landingRandom}\n
              Moderation in daily threads is more relaxed, but please stay on topic, be respectful of others and remember our [rules](https://www.reddit.com/r/apexlegends/wiki/rules)\n
              \n---\nGot any feedback for these daily posts? Message [Modmail](https://www.reddit.com/message/compose?to=%2Fr%2Fapexlegends) with any valid suggestions and feedback!`),
              sendReplies: false}
  
              r.getSubreddit("apexlegends").submitSelfpost({ title: ThursdayPost.title, text: ThursdayPost.text, sendReplies: ThursdayPost.sendReplies}).then(p => {
                console.log(p)
              }).catch(e => console.log(`Error on posting ${e}`))
  
              content.contentLists.ascensionList.splice([content.contentLists.ascensionList.indexOf(landingRandom)], 1)
              fs.writeFile('content.json', JSON.stringify(content, null, 4), (err) => {
                if (err) console.error(err);
              })
  
              console.log(`Successfully posted Landing Thursday at: ${moment().format(`MMMM Do YYYY, h:mm:ss a`)}`)

        }

        async function fridayPost(){

          var FridayPost = {
            title: `Free Talk Weekend | ${moment().format(`MMMM DD YYYY`)}`,
            text: dedent(`Welcome to **Free Talk** Weekend! There are no specific discussion topics for Weekends. As such, moderation is more relaxed regarding specific and content within the thread. 

            What's on your mind? How's your week in Apex? How have your Apex games been going lately? Want to show off your stats or banners? Need some help or want to give out some pointers? Anything you want to talk about that wasn't brought up in a previous thread or did you miss a specific discussion topic earlier this week? Talk about it here!

            This thread also serves as a group finder!\n

            Looking to grind out battle passes or events? How about a squad for some sweaty ranked games? Or maybe you're just looking for a chill bud for casual? If so, look no further!\n

            Helpful information to include in your LFG comment:\n
            - Platform\n
            - Username\n
            - Game Mode (casual/duos/ranked/firing range)\n
            - If ranked, what rank?\n
            - Time Zone/Region\n
            - Special requests (chill, sweaty tryhard, mic/no mic, Discord, 1v1, etc..)\n
            Alternatively, you can check out our [Discord](https://discord.gg/apexlegends), which has dedicated LFG channels, or our LFG subreddit r/ApexLFG.\n
            Moderation in daily threads is more relaxed, but please stay on topic, be respectful of others and remember our [rules](https://www.reddit.com/r/apexlegends/wiki/rules)\n
            \n---\nGot any feedback for these daily posts? Message [Modmail](https://www.reddit.com/message/compose?to=%2Fr%2Fapexlegends) with any valid suggestions and feedback!`),
            sendReplies: false}

            r.getSubreddit("apexlegends").submitSelfpost({ title: FridayPost.title, text: FridayPost.text, sendReplies: FridayPost.sendReplies}).then(p => {
              console.log(p)
            }).catch(e => console.log(`Error on posting ${e}`))

            console.log(`Successfully posted Free Talk Friday at: ${moment().format(`MMMM Do YYYY, h:mm:ss a`)}`)

        }

      now = new Date();                  // allow for time passing
      var delay = 60000 - (now % 60000); // exact ms to next minute interval
      setTimeout(loop, delay);
  })();
}

submissionStart();
console.log(`Sign in complete, performing loop function. Time: ${moment().format(`MMMM Do YYYY, h:mm:ss a`)}`)
