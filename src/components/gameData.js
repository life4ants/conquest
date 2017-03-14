import $ from 'jquery'

const Game = {

  clearBoard(){
    for (let i=0; i<10; i++){
      if ($('.color'+i))
        $('.color'+i).removeClass('color'+i)
    }
  },

  canFight(country1, country2){
    for (let i = 0; i<this.territoryInfo[country1].borders.length; i++){
      if (this.territoryInfo[country1].borders[i] === country2)
         return true;
    }
    return false;
  }

};

export default Game;

Game.territoryInfo =
[{name: "placeholder",          borders: [1, 85, 90]},
{name: "Alaska",                borders: [2, 3]},
{name: "Yukon Territory",       borders: [1, 3, 4]},
{name: "British Columbia",      borders: [1, 2, 4, 5, 48, 49, 50]},
{name: "Northwest Territories", borders: [2, 3, 5, 6, 7]},
{name: "Alberta",               borders: [3, 4, 6, 48]},
{name: "Saskatchewan",          borders: [4, 5, 7, 8, 39, 48]},
{name: "Nunavut",               borders: [4, 6, 8, 10]},
{name: "Manitoba",              borders: [6, 7, 9, 38, 39]},
{name: "Ontario",               borders: [8, 10, 17, 24, 38]},
{name: "Quebec",                borders: [7, 9, 11, 12, 14, 15, 16, 17]},
{name: "Labrador",              borders: [10, 12]},
{name: "Newfoundland",          borders: [10, 11, 13]},
{name: "Nova Scotia",           borders: [12, 14]},
{name: "New Brunswick",         borders: [10, 13, 15]},
{name: "Maine",                 borders: [10, 14, 16]},
{name: "Massachusetts",         borders: [10, 15, 17]},
{name: "New York",              borders: [9, 10, 16, 18]},
{name: "Pennsylvania",          borders: [17, 19, 20, 21]},
{name: "Virginia",              borders: [18, 20, 22, 27, 28]},
{name: "West Virginia",         borders: [18, 19, 21, 22]},
{name: "Ohio",                  borders: [18, 20, 22, 23, 24]},
{name: "Kentucy",               borders: [19, 20, 21, 23, 26, 27, 36]},
{name: "Indiana",               borders: [21, 22, 24, 26]},
{name: "Michigan",              borders: [9, 21, 23, 25]},
{name: "Wisconsin",             borders: [24, 26, 37, 38]},
{name: "Illinois",              borders: [22, 23, 25, 36, 37]},
{name: "Tennessee",             borders: [19, 22, 28, 30, 32, 33, 35, 36]},
{name: "North Carolina",        borders: [19, 27, 29, 30]},
{name: "South Carolina",        borders: [28, 30]},
{name: "Georgia",               borders: [27, 28, 29, 31, 32]},
{name: "Florida",               borders: [30, 32, 87, 88]},
{name: "Alabama",               borders: [27, 30, 31, 33]},
{name: "Mississippi",           borders: [27, 32, 34, 35]},
{name: "Louisiana",             borders: [33, 35, 44]},
{name: "Arkansas",              borders: [27, 33, 34, 36, 43, 44]},
{name: "Missouri",              borders: [22, 26, 27, 35, 37, 41, 42, 43]},
{name: "Iowa",                  borders: [25, 26, 36, 38, 40, 41]},
{name: "Minnesota",             borders: [8, 9, 25, 37, 39, 40]},
{name: "North Dakota",          borders: [6, 8, 38, 40, 48]},
{name: "South Dakota",          borders: [37, 38, 39, 41, 47, 48]},
{name: "Nebraska",              borders: [36, 37, 40, 42, 46, 47]},
{name: "Kansas",                borders: [36, 41, 43, 46]},
{name: "Oklahoma",              borders: [35, 36, 42, 44, 45, 46]},
{name: "Texas",                 borders: [34, 35, 43, 45, 60, 61, 67]},
{name: "New Mexico",            borders: [43, 44, 46, 55, 57, 60]},
{name: "Colorado",              borders: [41, 42, 43, 45, 47, 54]},
{name: "Wyoming",               borders: [40, 41, 46, 48, 49, 54]},
{name: "Montana",               borders: [3, 5, 6, 39, 40, 47, 49]},
{name: "Idaho",                 borders: [3, 47, 48, 50, 51, 53, 54]},
{name: "Washington",            borders: [3, 49, 51]},
{name: "Oregon",                borders: [49, 50, 52, 53]},
{name: "California",            borders: [51, 53, 55, 56]},
{name: "Nevada",                borders: [49, 51, 52, 54, 55]},
{name: "Utah",                  borders: [46, 47, 49, 53, 55]},
{name: "Arizona",               borders: [45, 52, 53, 54, 56, 57]},
{name: "Baja California",       borders: [52, 55, 57, 58]},
{name: "Sonora",                borders: [45, 55, 56, 58, 59, 60]},
{name: "Baja Calif. de Sur",    borders: [56, 57, 59]},
{name: "Sinaloa",               borders: [57, 58, 60, 62, 63]},
{name: "Chihuahua",             borders: [44, 45, 57, 59, 61, 62]},
{name: "Coahuila",              borders: [44, 60, 62, 64, 66, 67]},
{name: "Durango",               borders: [59, 60, 61, 63, 64]},
{name: "Nayarit",               borders: [59, 62, 64, 71]},
{name: "Zacatecas",             borders: [61, 62, 63, 65, 66, 70, 71]},
{name: "San Luis Potosi",       borders: [64, 66, 67, 68, 69, 70]},
{name: "Nuevo Leon",            borders: [61, 64, 65, 67]},
{name: "Tamaulipas",            borders: [44, 61, 65, 66, 68]},
{name: "Veracruz",              borders: [65, 67, 69, 74, 75, 76]},
{name: "Puebla",                borders: [65, 68, 70, 72, 73, 74]},
{name: "Guanajuato",            borders: [64, 65, 69, 71, 72]},
{name: "Jalisco",               borders: [63, 64, 70, 72]},
{name: "Michoacan",             borders: [69, 70, 71, 73]},
{name: "Guerrero",              borders: [69, 72, 74]},
{name: "Oaxaca",                borders: [68, 69, 73, 75]},
{name: "Chiapas",               borders: [68, 74, 76, 80]},
{name: "Campeche",              borders: [68, 75, 77, 78, 80]},
{name: "Yucatan",               borders: [76, 78]},
{name: "Quintana Roo",          borders: [76, 77, 79, 80, 87]},
{name: "Belize",                borders: [78, 80, 82]},
{name: "Guatemala",             borders: [75, 76, 78, 79, 81, 82]},
{name: "El Salvador",           borders: [80, 82, 83]},
{name: "Honduras",              borders: [79, 80, 81, 83]},
{name: "Nicaragua",             borders: [81, 82, 84]},
{name: "Costa Rica",            borders: [83, 85]},
{name: "Panama",                borders: [84]},
{name: "Jamaica",               borders: [87, 89]},
{name: "Cuba",                  borders: [31, 78, 86, 88, 89]},
{name: "Bahamas",               borders: [31, 87, 90]},
{name: "Haiti",                 borders: [86, 87, 90]},
{name: "Dominican Republic",    borders: [88, 89]}];

Game.coastTerrs = [1, 2, 3, 4, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 28, 29,
          30, 31, 32, 33, 34, 44, 50, 51,52, 56, 57, 58, 59, 63, 67, 68, 71, 72, 73, 74,
          75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90];
Game.pacific = [1,3,50,51,52,56,57,58,59,63,71,72,73,74,75,80,81];
Game.alantic = [2,4,7,8,9,10,11,12,13,14,15,16,17,18,19,28,29,30];
Game.gulf = [31, 32, 33, 34, 44, 67, 68, 76, 77, 78, 79, 82, 83, 84, 85, 86, 87, 88, 89, 90];

Game.coasts = [[1,3,50,51,52,56,57,58,59,63,71,72,73,74,75,80,81],
              [2,4,7,8,9,10,11,12,13,14,15,16,17,18,19,28,29,30],
              [31, 32, 33, 34, 44, 67, 68, 76, 77, 78, 79, 82, 83, 84, 85, 86, 87, 88, 89, 90]]

