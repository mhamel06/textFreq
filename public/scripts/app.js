Dropzone.autoDiscover = false;

angular.module('textFreq', ['dropZone']).controller('textFreqCtrl', function($scope, $http){
    $scope.originalStrings = [];
    $scope.totalWords = 0;
    $scope.inputWord = '';
    $scope.sortedStringsOne = [];
    $scope.sortedStringsTwo = [];


    $scope.loaded = function(text){

        $scope.originalStrings = text.replace(/(\r\n|\n|\r)/gm,' ')
        .replace(/\.|,|'|"/gm, '').split(' ');
        $scope.totalWords = $scope.originalStrings.length;
        $scope.updateOrder();
        $scope.sortedStringsOne = angular.copy($scope.sortedStringsTwo);
        $scope.$apply();

    }


    $scope.updateOrder = function(){
        var stringHash = {};

        var strings = $scope.originalStrings;

        for(var i in strings){
            var matched = false;
            if(!$scope.inputWord){
                matched = true;
            }
            if($scope.inputWord && (i-1 > 0) && $scope.inputWord === strings[i-1]){
                matched = true;
            }

            if(stringHash[strings[i]] && matched){
                stringHash[strings[i]].size += 1;
            }else if(matched && strings[i] != ""){
                stringHash[strings[i]] = {};
                stringHash[strings[i]].size = 1;
                stringHash[strings[i]].key = strings[i];
            }



        }
        $scope.sortedStringsTwo = (_.sortBy(_.toArray(stringHash), 'size')).reverse();
        $scope.updatePartThree();
    }

    $scope.updatePartThree = function(){
        if(!$scope.inputWord) return;

        var stringHash = {};

        var strings = $scope.originalStrings;
        for(var x = 0; x < 10; x++){
            for(var i = 2; i < strings.length; i++){
                if($scope.inputWord === strings[i-2] &&
                    $scope.sortedStringsTwo[x].key === strings[i-1]){
                        var key = strings[i-2] + " " + strings[i-1] + " " + strings[i];
                        if(stringHash[key]){
                            stringHash[key].size += 1;
                        }else{
                            stringHash[key] = {
                                size:1,
                                key: key
                            }
                        }
                    }
            }
        }

        $scope.sortedStringsThree = (_.sortBy(_.toArray(stringHash), 'size')).reverse();
        $http.post('/svc/output', {
            one:$scope.sortedStringsOne,
            two:$scope.sortedStringsTwo,
            three:$scope.sortedStringsThree,
            total: $scope.totalWords
        });
    }
})
