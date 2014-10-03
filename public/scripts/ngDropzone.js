angular.module('dropZone', []).directive('dropZone', function() {
  return {
      scope:{
          afterLoad:'='
      },
      link: function(scope, element, attrs) {
          var reader = new FileReader();
          reader.onload = function(e) {
              scope.afterLoad(reader.result);
            }
          element.dropzone({
            url: "/svc/uploadFile",
            maxFilesize: 100,
            paramName: "uploadfile",
            maxThumbnailFilesize: 5,
            init: function() {
                this.on("addedfile", function(file){
                    reader.readAsText(file, 'UTF8');
                });
              }
          });
      }

  }
});
