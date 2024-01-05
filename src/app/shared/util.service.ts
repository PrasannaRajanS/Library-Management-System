import { Injectable } from '@angular/core';
import * as _ from "lodash";
// import { DateformatPipe } from '../pipes/dateformat.pipe';
import { AppConstant } from '../app.constant';
import { MessagesService } from "./messages.service";
import { ReturnStatement } from '@angular/compiler';
// import * as jsPDF from 'jspdf';  
// import * as rasterizeHTML from 'rasterizehtml';

@Injectable()

export class UtilService {
    
  formError(controlName: string, formName: any) {
    const control =formName.get(controlName);
    if(control?.pristine && !control.touched)
    return
    return formName?.errors?.[controlName];
    // throw new Error('Method not implemented.');
  }

   regex: RegExp | undefined;
  constructor() { }
  static DEFAULT_MASKS = {
    pint: /[\d]/,
    'int': /[\d\-]/,
    Intsp:/a-zA-Z!@#\$%\^\&*\)\(+=._/i,
    pnum: /[\d\.]/,
    money: /[\d\.\s,]/,
    num: /[\d\-\.]/, 
    Number:/[0-9]/i,   
    char: /[a-z_\ \.]/i,
    character:/[a-z_\ \-]/i,
    hex: /[0-9a-f]/i,
    email: /[a-z0-9_\.\-@]/i,
    alpha: /[a-z_]/i,
    alphanum: /[a-z0-9_]/i,
    alphanumeric:/[a-z0-9\ \-]/i,
    specialnum: /[0-9<>_\-\\]/,
    // specialcharacters: /^[^<>*!@#$^&*()-+{};:"'|,?=_%.\/-`~]+$/  <>*!@#$^&*()-+{};:"'|,?=_`~\s
    specialcharacters: /^[^<>*!@#$^&*()-+{};:"'|,?=_`~%./]+$/,
    colorspecialcharacters: /^[^<>*!@#$^&*()-+{};:"'|,?=_`~%.]+$/,
    SpecialCharacter:/^[a-z_\ \.\_^<>*!@#$^&*()-+{};:"'|,?=_`~%./]/i
};
public activeDateOnly(event:any) {
  let e = event;
  // var regexStr: any = /^(((0[1-9]|[12]\d|3[01])\/(0[13578]|1[02])\/((19|[2-9]\d)\d{2}))|((0[1-9]|[12]\d|30)\/(0[13456789]|1[012])\/((19|[2-9]\d)\d{2}))|((0[1-9]|1\d|2[0-8])\/02\/((19|[2-9]\d)\d{2}))|(29\/02\/((1[6-9]|[2-9]\d)(0[48]|[2468][048]|[13579][26])|((16|[2468][048]|[3579][26])00))))$/;
  var regexStr = '^[a-zA-Z ]*$'
  let regEx = new RegExp(regexStr);
  if (regEx.test(e.key)) {
      return;
  } else {
      e.preventDefault();
  }
}

getCharCode(e: KeyboardEvent) {
  return e.charCode || e.keyCode || e.which;
};

public SpecialCharacterOnly(e: KeyboardEvent) {
  try {

      this.regex = UtilService.DEFAULT_MASKS.SpecialCharacter;
      let c = this.getCharCode(e);
      let cc = String.fromCharCode(c);
      let ok = true;
      if ([8, 9, 27, 13, 110, 190].indexOf(e.keyCode) !== -1 ||
          // Allow: Ctrl+A
          (e.keyCode == 65 && e.ctrlKey === true) ||
          // Allow: Ctrl+C
          (e.keyCode == 67 && e.ctrlKey === true) ||
          // Allow: Ctrl+V
          (e.keyCode == 86 && e.ctrlKey === true) ||
          // Allow: Ctrl+X
          (e.keyCode == 88 && e.ctrlKey === true)
          ||
          // // Allow: home, end, left, right
          (e.keyCode >= 35 && e.keyCode <= 39)
      ) {
          // let it happen, don't do anything
          return;
      }
      ok = this.regex.test(cc);

      if (!ok) {
          e.preventDefault();
      }

  } catch (error) {

  }

}
public CharacterHyphenOnly(e: KeyboardEvent) {
  try {

      this.regex = UtilService.DEFAULT_MASKS.character;
      let c = this.getCharCode(e);
      let cc = String.fromCharCode(c);
      let ok = true;
      if ([8, 9, 27, 13, 110, 190].indexOf(e.keyCode) !== -1 ||
          // Allow: Ctrl+A
          (e.keyCode == 65 && e.ctrlKey === true) ||
          // Allow: Ctrl+C
          (e.keyCode == 67 && e.ctrlKey === true) ||
          // Allow: Ctrl+V
          (e.keyCode == 86 && e.ctrlKey === true) ||
          // Allow: Ctrl+X
          (e.keyCode == 88 && e.ctrlKey === true)
          ||
          // // Allow: home, end, left, right
          (e.keyCode >= 35 && e.keyCode <= 39)
      ) {
          // let it happen, don't do anything
          return;
      }
      ok = this.regex.test(cc);

      if (!ok) {
          e.preventDefault();
      }

  } catch (error) {

  }

}
public NumberOnly(e: KeyboardEvent) {
  try {

      this.regex = UtilService.DEFAULT_MASKS.Number;
      let c = this.getCharCode(e);
      let cc = String.fromCharCode(c);
      let ok = true;
      if ([8, 9, 27, 13, 110, 190].indexOf(e.keyCode) !== -1 ||
          // Allow: Ctrl+A
          (e.keyCode == 65 && e.ctrlKey === true) ||
          // Allow: Ctrl+C
          (e.keyCode == 67 && e.ctrlKey === true) ||
          // Allow: Ctrl+V
          (e.keyCode == 86 && e.ctrlKey === true) ||
          // Allow: Ctrl+X
          (e.keyCode == 88 && e.ctrlKey === true)
          ||
          // // Allow: home, end, left, right
          (e.keyCode >= 35 && e.keyCode <= 39)
      ) {
          // let it happen, don't do anything
          return;
      }
      ok = this.regex.test(cc);

      if (!ok) {
          e.preventDefault();
      }

  } catch (error) {

  }

}


/**
* ActiveNumberOnly
*/
public ActiveNumberOnly(e: KeyboardEvent) {
  try {

      this.regex = UtilService.DEFAULT_MASKS.Intsp;
      let c = this.getCharCode(e);
      let cc = String.fromCharCode(c);
      let ok = true;
      if ([8, 9, 27, 13, 110, 190].indexOf(e.keyCode) !== -1 ||
          // Allow: Ctrl+A
          (e.keyCode == 65 && e.ctrlKey === true) ||
          // Allow: Ctrl+C
          (e.keyCode == 67 && e.ctrlKey === true) ||
          // Allow: Ctrl+V
          (e.keyCode == 86 && e.ctrlKey === true) ||
          // Allow: Ctrl+X
          (e.keyCode == 88 && e.ctrlKey === true)
          ||
          // // Allow: home, end, left, right
          (e.keyCode >= 35 && e.keyCode <= 39)
      ) {
          // let it happen, don't do anything
          return;
      }
      ok = this.regex.test(cc);

      if (!ok) {
          e.preventDefault();
      }

  } catch (error) {

  }

}

/**
* specialcharacters
*/
public ColorSpecialCharacters(e: KeyboardEvent) {
  try {
      this.regex = UtilService.DEFAULT_MASKS.colorspecialcharacters;
      let c = this.getCharCode(e);
      let cc = String.fromCharCode(c);
      let ok = true;
      console.log("keycode:", e.keyCode,this.getCharCode(e));
      //alert("c:"+c);
      //alert("cc:"+cc);    
      if ((this.getCharCode(e) == 86 && e.ctrlKey === true)) {
          e.preventDefault();
          
      }

      ok = this.regex.test(cc);

      if (!ok) {
          e.preventDefault();
      }else{return}
  } catch (error) {

  }

}

/**
* specialcharacters
*/
public specialcharacters(e: KeyboardEvent) {
  try {
      this.regex = UtilService.DEFAULT_MASKS.specialcharacters;
      let c = this.getCharCode(e);
      let cc = String.fromCharCode(c);
      let ok = true;
      console.log("keycode:", e.keyCode,this.getCharCode(e));
      //alert("c:"+c);
      //alert("cc:"+cc);    
      if ((this.getCharCode(e) == 86 && e.ctrlKey === true)) {
          e.preventDefault();
          
      }

      ok = this.regex.test(cc);

      if (!ok) {
          e.preventDefault();
      }else{return}
  } catch (error) {

  }

}
/**
* ActiveNumberPlsDivX
*/

public CharacterNumberOnly(e: KeyboardEvent) {
try {
  this.regex = UtilService.DEFAULT_MASKS.alphanum;
  let c = this.getCharCode(e);
  let cc = String.fromCharCode(c);
  let ok = true;
  console.log("keycode:", e.keyCode);
  //alert("c:"+c);
  //alert("cc:"+cc);    



  if ([8, 9, 27, 13, 110, 190,
      43,// (+) Plus Symbol
      47,// (/) Front Slash Symbol
      88,//Capital X letter
      120,//Small x letter
      39,// (') Single Quote
      46//(.)dot
  ].indexOf(this.getCharCode(e)) !== -1 ||
      // Allow: Ctrl+A
      (e.keyCode == 65 && e.ctrlKey === true) ||
      // Allow: Ctrl+C
      (e.keyCode == 67 && e.ctrlKey === true) ||
      // Allow: Ctrl+V
      (e.keyCode == 86 && e.ctrlKey === true) ||
      // Allow: Ctrl+X
      (e.keyCode == 88 && e.ctrlKey === true) ||
      (e.keyCode == 45 && e.shiftKey === true)

      // (e.keyCode != 45 )||
      //(e.keyCode !== 45 )
      // (e.keyCode <>= 45 )

      // ||
      // // // Allow: home, end, left, right

      // (e.keyCode > 35 && e.keyCode <= 39)
  ) {
      // let it happen, don't do anything
      return;
  }
  ok = this.regex.test(cc);

  if (!ok) {
      e.preventDefault();
  }
} catch (error) {

}
}
public OnlyCharacterNumber(e: KeyboardEvent) {
try {
  this.regex = UtilService.DEFAULT_MASKS.alphanumeric;
  let c = this.getCharCode(e);
  let cc = String.fromCharCode(c);
  let ok = true;
  console.log("keycode:", e.keyCode);
  //alert("c:"+c);
  //alert("cc:"+cc);    



  if ([8, 9, 27, 13, 110, 190,
      43,// (+) Plus Symbol
      47,// (/) Front Slash Symbol
      88,//Capital X letter
      120,//Small x letter
      39,// (') Single Quote
      46//(.)dot
  ].indexOf(this.getCharCode(e)) !== -1 ||
      // Allow: Ctrl+A
      (e.keyCode == 65 && e.ctrlKey === true) ||
      // Allow: Ctrl+C
      (e.keyCode == 67 && e.ctrlKey === true) ||
      // Allow: Ctrl+V
      (e.keyCode == 86 && e.ctrlKey === true) ||
      // Allow: Ctrl+X
      (e.keyCode == 88 && e.ctrlKey === true) ||
      (e.keyCode == 45 && e.shiftKey === true)

      // (e.keyCode != 45 )||
      //(e.keyCode !== 45 )
      // (e.keyCode <>= 45 )

      // ||
      // // // Allow: home, end, left, right

      // (e.keyCode > 35 && e.keyCode <= 39)
  ) {
      // let it happen, don't do anything
      return;
  }
  ok = this.regex.test(cc);

  if (!ok) {
      e.preventDefault();
  }
} catch (error) {

}
}

public charactersOnly(e: KeyboardEvent) {
try {

  this.regex = UtilService.DEFAULT_MASKS.char;
  let c = this.getCharCode(e);
  let cc = String.fromCharCode(c);
  let ok = true;
  console.log("keycode:", e.keyCode);
  //alert("c:"+c);
  //alert("cc:"+cc);    
  if ([8, 9, 27, 13, 110, 190,
      43,// (+) Plus Symbol
      47,// (/) Front Slash Symbol
      88,//Capital X letter
      120,//Small x letter
      39,// (') Single Quote
      46//(.)dot
  ].indexOf(this.getCharCode(e)) !== -1 ||
      // Allow: Ctrl+A
      (e.keyCode == 65 && e.ctrlKey === true) ||
      // Allow: Ctrl+C
      (e.keyCode == 67 && e.ctrlKey === true) ||
      // Allow: Ctrl+V
      (e.keyCode == 86 && e.ctrlKey === true) ||
      // Allow: Ctrl+X
      (e.keyCode == 88 && e.ctrlKey === true) ||
      (e.keyCode == 45 && e.shiftKey === true)

      // (e.keyCode != 45 )||
      //(e.keyCode !== 45 )
      // (e.keyCode <>= 45 )

      // ||
      // // // Allow: home, end, left, right

      // (e.keyCode > 35 && e.keyCode <= 39)
  ) {
      // let it happen, don't do anything
      return;
  }
  ok = this.regex.test(cc);

  if (!ok) {
      e.preventDefault();
  }
} catch (error) {

}
}

public specialnumOnly(e: KeyboardEvent) {
try {

  this.regex = UtilService.DEFAULT_MASKS.specialnum;
  let c = this.getCharCode(e);
  let cc = String.fromCharCode(c);
  let ok = true;
  console.log("keycode:", e.keyCode);
  //alert("c:"+c);
  //alert("cc:"+cc);    
  if ([8, 9, 27, 13, 110, 190,
      43,// (+) Plus Symbol
      47,// (/) Front Slash Symbol
      88,//Capital X letter
      120,//Small x letter
      39,// (') Single Quote
      46//(.)dot
  ].indexOf(this.getCharCode(e)) !== -1 ||
      // Allow: Ctrl+A
      (e.keyCode == 65 && e.ctrlKey === true) ||
      // Allow: Ctrl+C
      (e.keyCode == 67 && e.ctrlKey === true) ||
      // Allow: Ctrl+V
      (e.keyCode == 86 && e.ctrlKey === true) ||
      // Allow: Ctrl+X
      (e.keyCode == 88 && e.ctrlKey === true) ||
      (e.keyCode == 45 && e.shiftKey === true)

      // (e.keyCode != 45 )||
      //(e.keyCode !== 45 )
      // (e.keyCode <>= 45 )

      // ||
      // // // Allow: home, end, left, right

      // (e.keyCode > 35 && e.keyCode <= 39)
  ) {
      // let it happen, don't do anything
      return;
  }
  ok = this.regex.test(cc);

  if (!ok) {
      e.preventDefault();
  }
} catch (error) {

}
}

/**
* ActiveNumberPlsDivX
*/
public ActiveNumberPlsDivX(e: KeyboardEvent) {
  try {

      this.regex = UtilService.DEFAULT_MASKS.int;
      let c = this.getCharCode(e);
      let cc = String.fromCharCode(c);
      let ok = true;
      console.log("keycode:", e.keyCode);
      //alert("c:"+c);
      //alert("cc:"+cc);    



      if ([8, 9, 27, 13, 110, 190,
          43,// (+) Plus Symbol
          47,// (/) Front Slash Symbol
          88,//Capital X letter
          120,//Small x letter
          39,// (') Single Quote
          46//(.)dot
      ].indexOf(this.getCharCode(e)) !== -1 ||
          // Allow: Ctrl+A
          (e.keyCode == 65 && e.ctrlKey === true) ||
          // Allow: Ctrl+C
          (e.keyCode == 67 && e.ctrlKey === true) ||
          // Allow: Ctrl+V
          (e.keyCode == 86 && e.ctrlKey === true) ||
          // Allow: Ctrl+X
          (e.keyCode == 88 && e.ctrlKey === true) ||
          (e.keyCode == 45 && e.shiftKey === true)

          // (e.keyCode != 45 )||
          //(e.keyCode !== 45 )
          // (e.keyCode <>= 45 )

          // ||
          // // // Allow: home, end, left, right

          // (e.keyCode > 35 && e.keyCode <= 39)
      ) {
          // let it happen, don't do anything
          return;
      }
      ok = this.regex.test(cc);

      if (!ok) {
          e.preventDefault();
      }
  } catch (error) {

  }
}
public activeDecimalOnly($event: any) {
  //debugger;
  //console.log("decimal keycode:",$event.keyCode);
  if ([8, 9, 27, 13, 190].indexOf($event.keyCode) !== -1 ||
      // Allow: Ctrl+A
      ($event.keyCode == 65 && $event.ctrlKey === true) ||
      // Allow: Ctrl+C
      ($event.keyCode == 67 && $event.ctrlKey === true) ||
      // Allow: Ctrl+V
      ($event.keyCode == 86 && $event.ctrlKey === true) ||
      // Allow: Ctrl+X
      ($event.keyCode == 88 && $event.ctrlKey === true)
      // ||
      // // // Allow: home, end, left, right
      // ($event.keyCode >= 35 && $event.keyCode < 39)
  ) {
      // let it happen, don't do anything
      return;
  }

  var regexStr: any = '^[0-9.]';
  let regEx = new RegExp(regexStr);
  if ($event.keyCode !== 8) {
      if ($event.key === '-') {
          $event.preventDefault();
      }
      if (regEx.test($event.key)) {
          // let dotlength = $event.target.value.indexOf('.');
          if ($event.target.value.indexOf('.') !== -1) {
              // let length = $event.target.value.length;
              if ($event.key === '.') {
                  $event.preventDefault();
              }
              if ((($event.target.value.indexOf('.')) + 4) === $event.target.value.length) {
                  $event.preventDefault();
              }

          }
      } else {
          $event.preventDefault();
      }
  }
}
public active2DecimalOnly($event: any) {
  console.log("decimal keycode:", $event.keyCode);
  if ([8, 9, 27, 13, 190].indexOf($event.keyCode) !== -1 ||
      // Allow: Ctrl+A
      ($event.keyCode == 65 && $event.ctrlKey === true) ||
      // Allow: Ctrl+C
      ($event.keyCode == 67 && $event.ctrlKey === true) ||
      // Allow: Ctrl+V
      ($event.keyCode == 86 && $event.ctrlKey === true) ||
      // Allow: Ctrl+X
      ($event.keyCode == 88 && $event.ctrlKey === true)
      // ||
      // // // Allow: home, end, left, right
      // ($event.keyCode >= 35 && $event.keyCode < 39)
  ) {
      // let it happen, don't do anything
      return;
  }

  var regexStr: any = '^[0-9.]';
  let regEx = new RegExp(regexStr);
  if ($event.keyCode !== 8) {
      if ($event.key === '-') {
          $event.preventDefault();
      }
      if (regEx.test($event.key)) {
          // let dotlength = $event.target.value.indexOf('.');
          if ($event.target.value.indexOf('.') !== -1) {
              // let length = $event.target.value.length;
              if ($event.key === '.') {
                  $event.preventDefault();
              }
              if ((($event.target.value.indexOf('.')) + 3) === $event.target.value.length) {
                  $event.preventDefault();
              }

          }
      } else {
          $event.preventDefault();
      }
  }
}

public filterformatDataforDropdown(label:string, data:any, Placeholdervalue:any) {
  let formatdata = [];
  let customdata = {
      label: null,
      value: null
  };
  if (!_.isEmpty(Placeholdervalue)) {
      formatdata.push({
          label: Placeholdervalue,
          value: null
      });
  }

  _.forEach(data, (value) => {
      var shallow = _.clone(customdata);
      shallow.label = value[label];
      shallow.value = value[label];
      if (shallow.label != "") {
          formatdata.push(shallow);
      }

  });
  return formatdata;
}
public filterformatDataforvalueDropdown(label:string, data:any, Placeholdervalue:any) {
  let formatdata = [];
  let customdata = {
      label: null,
      value: null
  };
  if (!_.isEmpty(Placeholdervalue)) {
      formatdata.push({
          label: Placeholdervalue,
          value: null
      });
  }

  _.forEach(data, (value) => {
      var shallow = _.clone(customdata);
      shallow.label = value[label];
      shallow.value = value;
      if (shallow.label != "") {
          formatdata.push(shallow);
      }

  });
  return formatdata;
}

public AgentFormatDataForDropdown(label1:string, label2:string, data:any, Placeholdervalue:any) {
  let formatdata = [];
  let customdata = {
      label: null,
      value: null
  };
  if (!_.isEmpty(Placeholdervalue)) {
      formatdata.push({
          label: Placeholdervalue,
          value: null
      });
  }

  _.forEach(data, (value: any) => {
      if (Number(value.IsStatus) == 1) {
          var shallow: any = _.clone(customdata);
          shallow.label = value[label1] + "-" + value[label2];
          shallow.value = value;
          formatdata.push(shallow);
      }
  });
  return formatdata;
}





public idEqualSingleArray(source:any, destination:any) {
  var v: boolean = true;
  _.forEach(source, function (ddata) {
      var exisit: any = _.find(destination, function (cdata) {
          return (ddata == cdata)
      });
      if (_.isEmpty(exisit)) {
          v = false;
      }
  });
  return v;
}

public formatobjectArray(headerArray:any, dataArray:any) {
  var returndata = [];

  var filterdata = _.map(dataArray, function (orgdata) {
      var tempdata: any = {};
      _.forEach(headerArray, function (value, key) {

          if (!_.isEmpty(orgdata)) {
              value = value.toLowerCase()
              console.log('typeof', typeof orgdata[key]);
              tempdata[value] = orgdata[key];
          }
      });
      if (!_.isEmpty(tempdata)) {
          return tempdata;
      }

  });
  var formatedvalue = _.filter(filterdata, function (data) {
      return (!_.isEmpty(data))
  });
  console.log('formateddata', formatedvalue);
  return formatedvalue;

}

}
 