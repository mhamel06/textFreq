Dropzone.autoDiscover = false;

angular.module('textFreq', ['dropZone']).controller('textFreqCtrl', function($scope){
    $scope.name = 'matt';
    $scope.myText = "";
    $scope.myStrings = {};
    $scope.originalStrings = [];
    $scope.sortedStrings = [];
    $scope.totalWords = 0;
    $scope.inputWord = '';
    $scope.sortedStringsOne = [];

    $scope.loaded = function(text){

        $scope.originalStrings = text.replace(/(\r\n|\n|\r)/gm,' ').split(' ');
        $scope.totalWords = $scope.originalStrings.length;
        $scope.myStrings = {};
        $scope.updateOrder();
        $scope.sortedStringsOne = angular.copy($scope.sortedStrings);
        $scope.$apply();

    }


    $scope.updateOrder = function(){
        $scope.myStrings = {};

        var strings = $scope.originalStrings;

        for(var i in strings){
            var matched = false;
            if(!$scope.inputWord){
                matched = true;
            }
            if($scope.inputWord && (i-1 > 0) && $scope.inputWord === strings[i-1]){
                matched = true;
            }

            if($scope.myStrings[strings[i]] && matched){
                $scope.myStrings[strings[i]].size += 1;
            }else if(matched && strings[i] != ""){
                $scope.myStrings[strings[i]] = {};
                $scope.myStrings[strings[i]].size = 1;
                $scope.myStrings[strings[i]].key = strings[i];
            }



        }
        $scope.sortedStrings = (_.sortBy(_.toArray($scope.myStrings), 'size')).reverse();
        $scope.updateOrderThree();
    }

    $scope.updateOrderThree = function(){
        $scope.stringsThree = {};

        var strings = $scope.originalStrings;
        for(var i in strings){
            var matched = false;
            if(!$scope.inputWord){
                matched = true;
            }
            if($scope.inputWord && (i-2 > 0) && $scope.inputWord === strings[i-2]
            && $scope.sortedStrings[i-1] && $scope.sortedStrings[i-1].key === strings[-1]){
                matched = true;
            }

            if($scope.stringsThree[strings[i]] && matched){
                $scope.stringsThree[strings[i]].size += 1;
            }else if(matched && strings[i] != ""){
                $scope.stringsThree[strings[i]] = {};
                $scope.stringsThree[strings[i]].size = 1;
                $scope.stringsThree[strings[i]].key = strings[i];
            }
        }
        $scope.sortedStringsThree = (_.sortBy(_.toArray($scope.stringsThree), 'size')).reverse();
    }
})
