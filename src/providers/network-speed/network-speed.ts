import { Injectable } from '@angular/core';
import {Plugin, Cordova, CordovaProperty, CordovaInstance, IonicNativePlugin} from '@ionic-native/core';

@Plugin({
  pluginName: "networkmeter",
  plugin:"cordova-plugin-networkmeter",
  pluginRef:"NetworkSpeed",
  repo:'https://github.com/girish-fuluskar/NetworkSpeed.git',
  platforms:['Android','iOS']
})


@Injectable()
export class NetworkSpeedProvider {

  @Cordova()
  initiateDownload():Promise<String>{
    return;
  }

}
