/**
 * Created by callum on 10/09/15.
 */
var app = angular.module('myapp',[])


app.controller('mainCtrl',function($scope,$timeout){
    var socket = io('http://192.168.1.115:8999');
    socket.on('news', function (data) {
        var sensitivity = 10;

        $scope.check = function(a,b,c){
            if(a>b && a<c) { return true}
            else{ return false}
        }
        if(typeof $scope.ar == 'undefined'){
            $scope.timeout=true
            $timeout(function(){

                $scope.timeout=false
            },500);
        }
        $scope.$apply(function(){
            var ar = data.hello.split(',');
            if(ar.length==3 ){

                    $scope.ar = [];
                    angular.forEach(ar,function(i){
                        if(!isNaN(i)){
                            $scope.ar.push(i);
                        }
                    })
                var elem = document.getElementById('box');
                elem.style.transform = 'RotateX('+ parseFloat($scope.ar[2]) +'deg) RotateY('+ parseFloat($scope.ar[1]) +'deg)'
                //console.log('RotateX('+ $scope.ar[0] +'deg) RotateY('+ $scope.ar[2] +'deg)')
                //RotateY('+ $scope.ar[1] +'deg) Rotatez('+ $scope.ar[2] +'deg)
            }
        })
    });


})