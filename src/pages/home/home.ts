import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { BackgroundMode } from '@ionic-native/background-mode';
import { Network } from '@ionic-native/network';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { Autostart } from '@ionic-native/autostart';
import { AppModule } from '../../app/app.module';
import { Observable } from '../../../node_modules/rxjs/Observable';

import {NetworkSpeedProvider} from '../../providers/network-speed/network-speed';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController,private backgroundMode: BackgroundMode, public platform: Platform, private network: Network,
    private localNotifications: LocalNotifications, private iab: InAppBrowser, private autostart: Autostart, public networkspeed: NetworkSpeedProvider) {
    //this.init();
    //Pushing app in background
    this.backgroundMode.moveToBackground();

    this.backgroundMode.enable();

    this.getAll();

    
  }

  public getBytes():string{
    var bytesPrevious;
    var bytesCurrent;

    var imageAddr = "https://kenrockwell.com/contax/images/g2/examples/31120037-460.jpg";
    var downloadSize = 88800; //bytes
    return;
  }
  
  public getAll(): void {
    var me =this;
    let s;
    setTimeout(function(){
      if (me.network.type !== 'none') {
        // window.addEventListener('beforeunload', () => {
        //   console.log('Leaving Now');
        // })

        // console.log("Called");

        // //var imageAddr = "http://www.kenrockwell.com/contax/images/g2/examples/31120037-5mb.jpg";
        // var imageAddr = "https://kenrockwell.com/contax/images/g2/examples/31120037-460.jpg";
        // var downloadSize = 88800; //bytes      

        // var startTime, endTime;
        // var download = new Image();
        // download.onload = () => {
        //   endTime = (new Date()).getTime();

        //   var duration = (endTime - startTime) / 1000;
        //   var bitsLoaded = downloadSize * 8;
        //   var speedBps: any = (bitsLoaded / duration).toFixed(2);

        //   var speedKbps: any = (speedBps / 1024).toFixed(2);
        //   var speedMbps = (speedKbps / 1024).toFixed(2);
          
        //   console.log("Your connection speed is:" + speedBps + " bps, "+ speedKbps + " kbps, "+ speedMbps + " Mbps");
        this.networkspeed.initiateDownload().then(result =>{
          s = result;
        })
          me.localNotifications.schedule({
            id: 1,
            title: 'Network Status',
            text:  s + " Mbps",
            sound: null
            //every: sch
            //trigger: {in: 1}
          });
        // }
        // startTime = (new Date()).getTime();
        // var cacheBuster = "?nnn=" + startTime;
        // download.src = imageAddr + cacheBuster;
      } else {
        console.log(me.network.type);
        me.localNotifications.schedule({
          id: 1,
          title: 'Network Status',
          text: s + " Mbps",
          sound: null
          //every: sch
          //trigger: {in: 1}
        });      
      }
      

      me.getAll();
    },3000);
  }

  async init() {
    this.platform.ready().then(async (stop) =>{
      //Pushing app in background
      this.backgroundMode.moveToBackground();
        
      //Background Mode Activated
      // this.backgroundMode.on('activate').subscribe(async (stop) => {
      //   console.log('Background mode activated');
      //   //Checking network speed on launch of app
      //   let speed: string = await this.getDownloadSpeed();
        
      //   //Network Disconnect
      //   this.network.onDisconnect().subscribe(() => {
      //     console.log('Network Disconnected');
      //     console.log(this.network.type);
      //     this.ShowProgressMessage(
      //       "Your connection speed is: 0 bps, 0 kbps, 0 Mbps"
      //     );
      //   });
        
      //   //Network Connect
      //   this.network.onConnect().subscribe(() => {
      //     console.log('Network Connected');
      //     setTimeout(async (stop) => {
      //       if (this.network.type === 'wifi') {
      //         console.log('we got a ' + this.network.type);
      //         let speed: string = await this.getDownloadSpeed();
      //       }
      //     }, 1000);
      //   });

      //   this.network.onchange().subscribe(() => {
      //     console.log('Network changed');
      //     setTimeout(async (stop) => {
      //       if (this.network.type !== 'none') {
      //         console.log('we got a ' + this.network.type);
      //         let speed: string = await this.getDownloadSpeed();
      //       } else {
      //         console.log(this.network.type);
      //         this.ShowProgressMessage(
      //           "Your connection speed is: 0 bps, 0 kbps, 0 Mbps"
      //         );
      //       }
      //     }, 1000);
      //   });


      // });
      
      //Background Mode Deactivated
      // this.backgroundMode.on('deactivate').subscribe(async (stop) => {
      //   setTimeout(async (stop) => {
      //     console.log('Background mode deactivated');
        
      //     //Network Disconnect
      //     this.network.onDisconnect().subscribe(() => {
      //       console.log('Network Disconnected');
      //       console.log(this.network.type);
      //       this.ShowProgressMessage(
      //         "Your connection speed is: 0 bps, 0 kbps, 0 Mbps"
      //       );
      //     });        
          
      //     //Network Connect
      //     this.network.onConnect().subscribe(() => {
      //       console.log('Network Connected');
      //       setTimeout(async (stop) => {
      //         if (this.network.type === 'wifi') {
      //           console.log('we got a ' + this.network.type);
      //           let speed: string = await this.getDownloadSpeed();
      //         }
      //       }, 1000);
      //     });
      //   }, 1000);
        

      // });
      this.backgroundMode.enable();
    })
    
  }

  
    

  //Send Network Notification
  //Param 1: Message
  //Param 2: Schedule: i.e. "minute", "hour", "week", "month", "year"
  private SendNetworkNotification(msg, sch): void{
    this.localNotifications.schedule({
      id: 1,
      title: 'Network Status',
      text: msg
      //every: sch
      //trigger: {in: 1}
    });
  }

  //Network Progress Message
  private ShowProgressMessage(msg): void {
    if (console) {
      if (typeof msg == "string") {
        console.log(msg);
      } else {
        //for (var i = 0; i < msg.length; i++) {
          console.log(msg);
        //}
      }
      
      this.SendNetworkNotification(msg, 'minute');
    }

    var oProgress = document.getElementById("progress");
    if (oProgress) {
      var actualHTML = (typeof msg == "string") ? msg : msg.join("<br />");
      oProgress.innerHTML = actualHTML;
    }
  }

  //Getteing Network Speed
  private async getDownloadSpeed(): Promise<string> {
    return await this.MeasureConnectionSpeed();
  }

  //Measuring Network Speed
  private MeasureConnectionSpeed(): Promise<string> {
    return new Promise((resolve) => {
      var imageAddr = "http://www.kenrockwell.com/contax/images/g2/examples/31120037-5mb.jpg";
      var downloadSize = 4995374; //bytes


      var startTime, endTime;
      var download = new Image();
      download.onload = () => {
        endTime = (new Date()).getTime();

        var duration = (endTime - startTime) / 1000;
        var bitsLoaded = downloadSize * 8;
        var speedBps: any = (bitsLoaded / duration).toFixed(2);
        var speedKbps: any = (speedBps / 1024).toFixed(2);
        var speedMbps = (speedKbps / 1024).toFixed(2);
        this.ShowProgressMessage(
          "Your connection speed is:" +
          speedBps + " bps, "+
          speedKbps + " kbps, "+
          speedMbps + " Mbps"
        );
        //console.log(this.ShowProgressMessage);
        resolve(this.ShowProgressMessage.toString());
      }
      startTime = (new Date()).getTime();
      var cacheBuster = "?nnn=" + startTime;
      download.src = imageAddr + cacheBuster;
    });
  }
  

}
