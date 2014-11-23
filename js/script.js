OrderList = [];
OrderDuration = [];
OrderPlayCount = [];
Name = [];
Playcount = [];
Listeners = [];
NameArtis = [];
DurationSong = [];
BiographyArtis = [];
ListenSong = [];
ImgDisk = [];
var play = "http://www.microstrategy.com/cmstemplates/microstrategy/images/icon_play-button_200.png"


function ShowList(i) {
    $(".TopList").append("<div class=\"row\">"+
                                "<div class = \"span12\">"+
                                  "<div class=\"row\">"+
                                    "<div class = \"span2\">"+
                                      "<div class = \"configIndex\">"+
                                        "<p class = \"index\">"+(i+1)+"</p>"+
                                      "</div>"+
                                    "</div>"+
                                    "<div class = \"span10\">"+
                                      "<div class=\"row\">"+
                                        "<div class=\"ListSongs\">"+
                                          "<div class=\"row\">"+
                                            "<div class = \"span2\">"+"<img src=\""+ImgDisk[i]+"\" class =\"ImgDisk img-polaroid\">"+"</div>"+
                                            "<div class = \"span6\">"+
                                              "<div class=\"row\">"+
                                                "<div class = \"span6\">"+"<h3>"+Name[i]+" - "+NameArtis[i]+"</h3>"+"</div>"+
                                                "<div class = \"span6\">"+"<p>"+"Duration: "+(DurationSong[i]/60).toFixed(2)+" Listeners: "+Listeners[i]+" playcount: "+Playcount[i]+"</p>"+"</div>"+
                                                "<div class = \"span6\">"+"<p>"+"<a href=\""+BiographyArtis[i]+"\" style= 'color: #ffffff' >"+" Biography Artist "+"</a>"+"</p>"+"</div>"+
                                              "</div>"+
                                            "</div>"+
                                            "<div class = \"span2\">"+
                                              "<a href =\""+ListenSong[i]+"\">"+"<img src=\""+play+"\" class = \"imgPlay img-circle\">"+"</a>"+
                                            "</div>"+
                                          "</div>"+
                                        "</div>"+
                                      "</div>"+
                                    "</div>"+
                                  "</div>"+
                                "</div>"+ 
                              "</div>");
};

jQuery(document).ready(function($) {
  $.ajax({
  url : "http://ws.audioscrobbler.com/2.0/?method=chart.gettoptracks&api_key=05d4b311160508e4320ec650346e45c8&format=json",
  dataType : "jsonp",
    success : function(parsed_json) {

      for (var i = 0; i < 50; i++) {
        OrderList.push(parsed_json["tracks"]["track"][i]["name"])
        OrderDuration.push(parsed_json["tracks"]["track"][i]["duration"])
        OrderPlayCount.push(parsed_json["tracks"]["track"][i]["playcount"])
        Name.push(parsed_json["tracks"]["track"][i]["name"])
        Playcount.push(parsed_json["tracks"]["track"][i]["playcount"])
        Listeners.push(parsed_json["tracks"]["track"][i]["listeners"])
        NameArtis.push(parsed_json["tracks"]["track"][i]["artist"]["name"])
        DurationSong.push(parsed_json["tracks"]["track"][i]["duration"])
        BiographyArtis.push(parsed_json["tracks"]["track"][i]["artist"]["url"])
        ListenSong.push(parsed_json["tracks"]["track"][i]["url"])

        try {ImgDisk.push(parsed_json["tracks"]["track"][i]["image"][2]["#text"])}
        catch(err){ImgDisk.push("https://www.wordans.ca/wvc-1332825671/wordansfiles/images/2012/3/27/133476/133476_340.jpg")}

        ShowList(i);
      };
    }
  });
});



$(document).ready(function() {
  function alphabeticalaz(a, b){
    var A = a.toLowerCase();
    var B = b.toLowerCase();
    if (A < B){
      return -1;
    }else if (A > B){
     return  1;
    }else{
     return 0;
    }
  };

  function alphabeticalza(a, b){
      var A = a.toLowerCase();
      var B = b.toLowerCase();
      if (A > B){
        return -1;
      }else if (A < B){
       return  1;
      }else{
       return 0;
      }
  };

  function FunOrderDurationAscen(a, b){
    a = a/60
    b = b/60
    if (a>b) {return 1}else{return 0};
  };

  function FunOrderDurationDescen(a, b){
    a = a/60
    b = b/60
    if (a<b) {return 1}else{return 0};
  };

  function FunOrderPlayCountAscen(a, b){
    if (a>b) {return 1}else{return 0};
  };

  function FunOrderPlayCountDescen(a, b){
    if (a<b) {return 1}else{return 0};
  };

  $(".DelFilters").click(function(){
    $(".TopList").empty();
    OrderList.sort(alphabeticalaz);

    for (var i = 0; i <50; i++) {
      ShowList(i);
    };
  });

  $(".az").click(function(){
    $(".TopList").empty();
    OrderList.sort(alphabeticalaz);

    for (var x = 0; x <50; x++) {
      for (var i = 0; i <50; i++) {
        if (OrderList[x] === Name[i]) {
          ShowList(i);
        };
      };
    };
  });

  $(".za").click(function(){
    $(".TopList").empty();
    OrderList.sort(alphabeticalza);

    for (var x = 0; x <50; x++) {
      for (var i = 0; i <50; i++) {
        if (OrderList[x] === Name[i]) {
          ShowList(i);
        };
      };
    };
  });

  $(".durationAscen").click(function(){
    $(".TopList").empty();
    OrderDuration.sort(FunOrderDurationAscen);
    for (var x = 0; x <50; x++) {
      for (var i = 0; i <50; i++) {
        if (OrderDuration[x] === DurationSong[i]) {
          ShowList(i);
        };
      };
    };
  });

  $(".durationDescen").click(function(){
    $(".TopList").empty();
    OrderDuration.sort(FunOrderDurationDescen);
    for (var x = 0; x <50; x++) {
      for (var i = 0; i <50; i++) {
        if (OrderDuration[x] === DurationSong[i]) {
          ShowList(i);
        };
      };
    };
  });

  $(".playcountAscen").click(function(){
    $(".TopList").empty();
    OrderPlayCount.sort(FunOrderDurationAscen);
    for (var x = 0; x <50; x++) {
      for (var i = 0; i <50; i++) {
        if (OrderPlayCount[x] === Playcount[i]) {
          ShowList(i);
        };
      };
    };
  });

  $(".playcountDescen").click(function(){
    $(".TopList").empty();
    OrderPlayCount.sort(FunOrderDurationDescen);
    for (var x = 0; x <50; x++) {
      for (var i = 0; i <50; i++) {
        if (OrderPlayCount[x] === Playcount[i]) {
          ShowList(i);
        };
      };
    };
  });

});
