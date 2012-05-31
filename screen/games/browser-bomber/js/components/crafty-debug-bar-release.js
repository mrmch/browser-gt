Crafty.extend({debugBar:{show:function(){var a=$("body");a.append(this._generateTemplate())},_generateTemplate:function(){var c='<style>.clear {clear:both}#crafty-debug {position: fixed;left: 0;right: 0;height: 35px;margin: 0;z-index: 6000000;font: 12px Verdana, Arial, sans-serif;text-align: left;color: #FFF;bottom: 0;border-top: 1px solid #BBB;background: #3e3e3e; background: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/Pgo8c3ZnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgdmlld0JveD0iMCAwIDEgMSIgcHJlc2VydmVBc3BlY3RSYXRpbz0ibm9uZSI+CiAgPGxpbmVhckdyYWRpZW50IGlkPSJncmFkLXVjZ2ctZ2VuZXJhdGVkIiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgeDE9IjAlIiB5MT0iMCUiIHgyPSIwJSIgeTI9IjEwMCUiPgogICAgPHN0b3Agb2Zmc2V0PSI2JSIgc3RvcC1jb2xvcj0iIzNlM2UzZSIgc3RvcC1vcGFjaXR5PSIxIi8+CiAgICA8c3RvcCBvZmZzZXQ9IjclIiBzdG9wLWNvbG9yPSIjMjgyODI4IiBzdG9wLW9wYWNpdHk9IjEiLz4KICAgIDxzdG9wIG9mZnNldD0iOTklIiBzdG9wLWNvbG9yPSIjMWYxZjFmIiBzdG9wLW9wYWNpdHk9IjEiLz4KICA8L2xpbmVhckdyYWRpZW50PgogIDxyZWN0IHg9IjAiIHk9IjAiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9InVybCgjZ3JhZC11Y2dnLWdlbmVyYXRlZCkiIC8+Cjwvc3ZnPg==);background: -moz-linear-gradient(top,  #3e3e3e 6%, #282828 7%, #1f1f1f 99%); background: -webkit-gradient(linear, left top, left bottom, color-stop(6%,#3e3e3e), color-stop(7%,#282828), color-stop(99%,#1f1f1f)); background: -webkit-linear-gradient(top,  #3e3e3e 6%,#282828 7%,#1f1f1f 99%); background: -o-linear-gradient(top,  #3e3e3e 6%,#282828 7%,#1f1f1f 99%); background: -ms-linear-gradient(top,  #3e3e3e 6%,#282828 7%,#1f1f1f 99%); background: linear-gradient(top,  #3e3e3e 6%,#282828 7%,#1f1f1f 99%); filter: progid:DXImageTransform.Microsoft.gradient( startColorstr="#3e3e3e", endColorstr="#1f1f1f",GradientType=0 ); }#crafty-debug ul.menu {list-style-type: none;padding: 0;margin: 0;}#crafty-debug ul.menu li{display: inline-block;white-space: nowrap;color: #2F2F2F;min-height: 28px;padding: 0px;float: left;cursor: default;}#crafty-debug ul.menu li:hover {box-shadow: rgba(0, 0, 0, 0.3) 0 0 5px;}#crafty-debug ul.menu li a{padding: 4px 10px 9px 10px;color: #FFF; display:block; text-decoration: none}#crafty-debug ul.menu li a img {float:left; padding-top: 4px;}#crafty-debug ul.menu li a .text {float:left; padding-top: 8px;}#crafty-debug ul.menu li.version{font-weight: bold; min-width: 110px;}#crafty-debug ul.menu .separator {float:left;height:35px;width:2px;background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAAAjCAYAAAC+Rtu3AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA01pVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoMTMuMCAyMDEyMDMwNS5tLjQxNSAyMDEyLzAzLzA1OjIxOjAwOjAwKSAgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjVFNkE1NjA2QTM0QTExRTFBQUIyRDY5NkYxQTk4Q0RBIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjVFNkE1NjA3QTM0QTExRTFBQUIyRDY5NkYxQTk4Q0RBIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NUU2QTU2MDRBMzRBMTFFMUFBQjJENjk2RjFBOThDREEiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NUU2QTU2MDVBMzRBMTFFMUFBQjJENjk2RjFBOThDREEiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4M0cCrAAAAG0lEQVR42mLasWOH2v///9WYGKBglEEkAyDAAMfmBbi3ocYXAAAAAElFTkSuQmCC");}#crafty-debug ul.menu .frames {float:right}#crafty-debug ul.menu .close {cursor:pointer;float:right;width:10px; height:10px;}#crafty-debug #entities-box{position: fixed;left: 110px;bottom: 35px;height: 200px;border: 1px solid #2F2F2F;display: none;background-color: white;border-bottom: 0px;padding-right: 10px;}#crafty-debug .content .header {width: 100%;padding: 5px 0px 0px 10px;margin-bottom: 5px;float:left;color: #FFF; background: #282828; background: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/Pgo8c3ZnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgdmlld0JveD0iMCAwIDEgMSIgcHJlc2VydmVBc3BlY3RSYXRpbz0ibm9uZSI+CiAgPGxpbmVhckdyYWRpZW50IGlkPSJncmFkLXVjZ2ctZ2VuZXJhdGVkIiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgeDE9IjAlIiB5MT0iMCUiIHgyPSIwJSIgeTI9IjEwMCUiPgogICAgPHN0b3Agb2Zmc2V0PSIyJSIgc3RvcC1jb2xvcj0iIzI4MjgyOCIgc3RvcC1vcGFjaXR5PSIxIi8+CiAgICA8c3RvcCBvZmZzZXQ9IjEwMCUiIHN0b3AtY29sb3I9IiMxZjFmMWYiIHN0b3Atb3BhY2l0eT0iMSIvPgogIDwvbGluZWFyR3JhZGllbnQ+CiAgPHJlY3QgeD0iMCIgeT0iMCIgd2lkdGg9IjEiIGhlaWdodD0iMSIgZmlsbD0idXJsKCNncmFkLXVjZ2ctZ2VuZXJhdGVkKSIgLz4KPC9zdmc+);background: -moz-linear-gradient(top,  #282828 2%, #1f1f1f 100%); /* FF3.6+ */background: -webkit-gradient(linear, left top, left bottom, color-stop(2%,#282828), color-stop(100%,#1f1f1f)); /* Chrome,Safari4+ */background: -webkit-linear-gradient(top,  #282828 2%,#1f1f1f 100%); /* Chrome10+,Safari5.1+ */background: -o-linear-gradient(top,  #282828 2%,#1f1f1f 100%); /* Opera 11.10+ */background: -ms-linear-gradient(top,  #282828 2%,#1f1f1f 100%); /* IE10+ */background: linear-gradient(top,  #282828 2%,#1f1f1f 100%); /* W3C */filter: progid:DXImageTransform.Microsoft.gradient( startColorstr="#282828", endColorstr="#1f1f1f",GradientType=0 ); /* IE6-8 */margin-bottom: 0px;margin-right: 0px;}#crafty-debug #entities-box .separator{display: inline-block;height: 26px;width: 2px;background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAAAaCAYAAACdM43SAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA01pVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoMTMuMCAyMDEyMDMwNS5tLjQxNSAyMDEyLzAzLzA1OjIxOjAwOjAwKSAgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjcyODM2RkFDQTM0QTExRTE5MkEyQzE5MjI3QUIyMEVEIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjcyODM2RkFEQTM0QTExRTE5MkEyQzE5MjI3QUIyMEVEIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NzI4MzZGQUFBMzRBMTFFMTkyQTJDMTkyMjdBQjIwRUQiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NzI4MzZGQUJBMzRBMTFFMTkyQTJDMTkyMjdBQjIwRUQiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz6S54I8AAAAJ0lEQVR42mLYsWOH6v///1VZGBgYGIGYgYkBCoYHA+Sv/yAGQIABAP8oBqam0rxQAAAAAElFTkSuQmCC");margin-top: -5px;float: right}#crafty-debug #entities-box .list{height: 145px;width: 150px; float:left}#crafty-debug #entities-box .list ul{height: 130px;width: 145px;overflow-y: scroll;padding-left: 5px;list-style-type: none;padding-right: 10px;font-size: 11px;margin-top: 0px;padding-top: 5px;}#crafty-debug #entities-box .list ul li a{padding: 3px 0px 3px 0px;border-bottom: 1px dashed #BBB;color: #2F2F2F; display:block; text-decoration: none}#crafty-debug #entities-box .list input.search{padding: 3px;width: 115px;margin: 5px auto 0px auto;font-size: 11px;display: block; border: 1px solid #BBB;}#crafty-debug #entities-box .properties{height: 190px;width: 130px;float: left;margin-left: 10px;color: #282828;}#crafty-debug #entities-box .properties .content{padding-left: 10px;}#crafty-debug #entities-box .components{height: 190px;width: 130px;float: left;margin-left: 10px;color: #282828;}#crafty-debug #entities-box .components .content{padding-left: 10px;}#crafty-debug #entities-box .options{height: 190px;width: 130px;float: left;margin-left: 10px;color: #282828;}#crafty-debug #entities-box .options .content{padding-left: 10px; padding-top: 30px;}#crafty-debug #entities-box .properties .single {}#crafty-debug #entities-box .properties .single label {display: block;width: 45px;float: left;padding-top: 6px;text-align: right;margin-right: 15px;font-weight:bold;}#crafty-debug #entities-box .properties .single input{float:left; width: 50px; font-size: 11px;}#crafty-debug #entities-box .components{height: 145px;width: 160px; float:left}#crafty-debug #entities-box .components ul{height: 130px;width: 145px;overflow-y: scroll;padding-left: 5px;list-style-type: none;padding-right: 10px;font-size: 11px;margin-top: 0px;padding-top: 5px;}#crafty-debug #entities-box .components ul li{border-bottom: 1px dashed #BBB;}#crafty-debug #entities-box .components ul li a{float:left; padding: 3px 0px 3px 0px;color: #2F2F2F; display:block; text-decoration: none}#crafty-debug #entities-box .components ul li a.remove {float:right; color: #b60d0d}#crafty-debug #entities-box .components input.search{float:left;padding: 3px;width: 115px;margin: 5px auto 0px auto;font-size: 11px;display: block; border: 1px solid #BBB;}#crafty-debug #entities-box .components .addComponent {padding: 8px 0px 8px 4px;float: left;cursor: pointer; margin-right:5px;}#crafty-debug .btn{text-align: center; color: #FFFFFF;padding:2px; margin:5px 0px; cursor:pointer;}#crafty-debug .btn-red{border:1px solid #b90707; background: #d54848; background: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/Pgo8c3ZnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgdmlld0JveD0iMCAwIDEgMSIgcHJlc2VydmVBc3BlY3RSYXRpbz0ibm9uZSI+CiAgPGxpbmVhckdyYWRpZW50IGlkPSJncmFkLXVjZ2ctZ2VuZXJhdGVkIiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgeDE9IjAlIiB5MT0iMCUiIHgyPSIwJSIgeTI9IjEwMCUiPgogICAgPHN0b3Agb2Zmc2V0PSI4JSIgc3RvcC1jb2xvcj0iI2Q1NDg0OCIgc3RvcC1vcGFjaXR5PSIxIi8+CiAgICA8c3RvcCBvZmZzZXQ9IjglIiBzdG9wLWNvbG9yPSIjY2UyMDIwIiBzdG9wLW9wYWNpdHk9IjEiLz4KICAgIDxzdG9wIG9mZnNldD0iOTklIiBzdG9wLWNvbG9yPSIjY2EwZjBmIiBzdG9wLW9wYWNpdHk9IjEiLz4KICA8L2xpbmVhckdyYWRpZW50PgogIDxyZWN0IHg9IjAiIHk9IjAiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9InVybCgjZ3JhZC11Y2dnLWdlbmVyYXRlZCkiIC8+Cjwvc3ZnPg==); background: -moz-linear-gradient(top,  #d54848 8%, #ce2020 8%, #ca0f0f 99%); background: -webkit-gradient(linear, left top, left bottom, color-stop(8%,#d54848), color-stop(8%,#ce2020), color-stop(99%,#ca0f0f)); background: -webkit-linear-gradient(top,  #d54848 8%,#ce2020 8%,#ca0f0f 99%); background: -o-linear-gradient(top,  #d54848 8%,#ce2020 8%,#ca0f0f 99%); background: -ms-linear-gradient(top,  #d54848 8%,#ce2020 8%,#ca0f0f 99%); background: linear-gradient(top,  #d54848 8%,#ce2020 8%,#ca0f0f 99%); filter: progid:DXImageTransform.Microsoft.gradient( startColorstr="#d54848", endColorstr="#ca0f0f",GradientType=0 ); }#crafty-debug .btn-black{border:1px solid #000000; background: #505050; background: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/Pgo8c3ZnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgdmlld0JveD0iMCAwIDEgMSIgcHJlc2VydmVBc3BlY3RSYXRpbz0ibm9uZSI+CiAgPGxpbmVhckdyYWRpZW50IGlkPSJncmFkLXVjZ2ctZ2VuZXJhdGVkIiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgeDE9IjAlIiB5MT0iMCUiIHgyPSIwJSIgeTI9IjEwMCUiPgogICAgPHN0b3Agb2Zmc2V0PSI2JSIgc3RvcC1jb2xvcj0iIzUwNTA1MCIgc3RvcC1vcGFjaXR5PSIxIi8+CiAgICA8c3RvcCBvZmZzZXQ9IjYlIiBzdG9wLWNvbG9yPSIjMjcyNzI3IiBzdG9wLW9wYWNpdHk9IjEiLz4KICAgIDxzdG9wIG9mZnNldD0iMTAwJSIgc3RvcC1jb2xvcj0iIzIwMjAyMCIgc3RvcC1vcGFjaXR5PSIxIi8+CiAgPC9saW5lYXJHcmFkaWVudD4KICA8cmVjdCB4PSIwIiB5PSIwIiB3aWR0aD0iMSIgaGVpZ2h0PSIxIiBmaWxsPSJ1cmwoI2dyYWQtdWNnZy1nZW5lcmF0ZWQpIiAvPgo8L3N2Zz4=); background: -moz-linear-gradient(top,  #505050 6%, #272727 6%, #202020 100%); background: -webkit-gradient(linear, left top, left bottom, color-stop(6%,#505050), color-stop(6%,#272727), color-stop(100%,#202020)); background: -webkit-linear-gradient(top,  #505050 6%,#272727 6%,#202020 100%); background: -o-linear-gradient(top,  #505050 6%,#272727 6%,#202020 100%); background: -ms-linear-gradient(top,  #505050 6%,#272727 6%,#202020 100%); background: linear-gradient(top,  #505050 6%,#272727 6%,#202020 100%); filter: progid:DXImageTransform.Microsoft.gradient( startColorstr="#505050", endColorstr="#202020",GradientType=0 ); }#crafty-debug .btn-black.off{border:1px solid #616161; background: #bebebe; background: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/Pgo8c3ZnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgdmlld0JveD0iMCAwIDEgMSIgcHJlc2VydmVBc3BlY3RSYXRpbz0ibm9uZSI+CiAgPGxpbmVhckdyYWRpZW50IGlkPSJncmFkLXVjZ2ctZ2VuZXJhdGVkIiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgeDE9IjAlIiB5MT0iMCUiIHgyPSIwJSIgeTI9IjEwMCUiPgogICAgPHN0b3Agb2Zmc2V0PSI3JSIgc3RvcC1jb2xvcj0iI2JlYmViZSIgc3RvcC1vcGFjaXR5PSIxIi8+CiAgICA8c3RvcCBvZmZzZXQ9IjclIiBzdG9wLWNvbG9yPSIjYWVhZWFlIiBzdG9wLW9wYWNpdHk9IjEiLz4KICAgIDxzdG9wIG9mZnNldD0iMTAwJSIgc3RvcC1jb2xvcj0iI2EzYTNhMyIgc3RvcC1vcGFjaXR5PSIxIi8+CiAgPC9saW5lYXJHcmFkaWVudD4KICA8cmVjdCB4PSIwIiB5PSIwIiB3aWR0aD0iMSIgaGVpZ2h0PSIxIiBmaWxsPSJ1cmwoI2dyYWQtdWNnZy1nZW5lcmF0ZWQpIiAvPgo8L3N2Zz4=); background: -moz-linear-gradient(top,  #bebebe 7%, #aeaeae 7%, #a3a3a3 100%); background: -webkit-gradient(linear, left top, left bottom, color-stop(7%,#bebebe), color-stop(7%,#aeaeae), color-stop(100%,#a3a3a3)); background: -webkit-linear-gradient(top,  #bebebe 7%,#aeaeae 7%,#a3a3a3 100%); background: -o-linear-gradient(top,  #bebebe 7%,#aeaeae 7%,#a3a3a3 100%); background: -ms-linear-gradient(top,  #bebebe 7%,#aeaeae 7%,#a3a3a3 100%); background: linear-gradient(top,  #bebebe 7%,#aeaeae 7%,#a3a3a3 100%); filter: progid:DXImageTransform.Microsoft.gradient( startColorstr="#bebebe", endColorstr="#a3a3a3",GradientType=0 ); }#crafty-debug #entities-box .options .content .btn{width:120px; height:15px;}</style>';var a='<div id="entities-box"><div class="content"><div class="list"><div class="header">ENTITIES<div class="separator"></div></div><ul id="entities-box-list"></ul><input id="entities-search" type="text" placeholder="serach entity" class="search" /></div><div class="properties"><div class="header">PROPERTIES<div class="separator"></div></div><div class="content"></div></div><div class="components"><div class="header">COMPONENTS<div class="separator"></div></div><div class="content" style="display:none"><ul id="components-box-list"></ul><input id="entities-search" type="text" placeholder="add component" class="search" /><img data-entity-id="" class="addComponent" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAPCAYAAAA71pVKAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA01pVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoMTMuMCAyMDEyMDMwNS5tLjQxNSAyMDEyLzAzLzA1OjIxOjAwOjAwKSAgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjlFRkFEQzc0QTM0MzExRTE5N0NBRjM2REEwOTczRjkzIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjlFRkFEQzc1QTM0MzExRTE5N0NBRjM2REEwOTczRjkzIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6OUVGQURDNzJBMzQzMTFFMTk3Q0FGMzZEQTA5NzNGOTMiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6OUVGQURDNzNBMzQzMTFFMTk3Q0FGMzZEQTA5NzNGOTMiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz617/6bAAAA3klEQVR42pySMQ6CQBBFh41HUA5gBZWFRg0HUdRwOgqjrYdAEi2sqLDUBPUCFugfM2s2BsLKTx7JZv+fHXbH8TyPDCkwBwswBT1wA3uwBhtQarNjhPtgC4ZUryOYgbM+SQeThiDJfiL+T1hJOy7ZyRW/4mAIRlWuLMvqCrA/5HBE7RSpulMtNODbflm2Sr7vm8tnB5876FYZuNBPwNSD2z60bPvE4bhlOOZ/5gLpnxfH3U6UzCq/dWEZLMRf6vHMQSCzSw2zHYj/O9u6wBgswQ5c+DnAVdYr2c914C3AANvWMQe07pynAAAAAElFTkSuQmCC" /></div></div><div class="options"><div class="header">OPTIONS<div class="separator"></div></div><div class="content"></div></div></div>';"</div>";var b='<div id="crafty-debug"><ul class="menu"><li class="bar-item version" data-item="version"><a title="Crafty documentation" href="http://craftyjs.com/api/Crafty.html" target="_blank"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAWCAYAAADEtGw7AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA01pVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoMTMuMCAyMDEyMDMwNS5tLjQxNSAyMDEyLzAzLzA1OjIxOjAwOjAwKSAgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjFEMTlFMzlDQTM0MzExRTFBMjYzQkZERjA2QjRDOTY5IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjFEMTlFMzlEQTM0MzExRTFBMjYzQkZERjA2QjRDOTY5Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MUQxOUUzOUFBMzQzMTFFMUEyNjNCRkRGMDZCNEM5NjkiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6MUQxOUUzOUJBMzQzMTFFMUEyNjNCRkRGMDZCNEM5NjkiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz5XyGHNAAAEs0lEQVR42oyUXUwcVRTH/zNzZ2Z3YJfdLUvBBflKP6CF1hhCQ6smWltKE5tYjBpjSWx9IBq1L60PSmKiSZsYX0zkIw1J34wN+qBt+mBqoEl50IZYHhQIhihSFsSF/ZqdrzueGQoWRNKb3Mzm7J3fOed//nOFmb4Xse0SXEBk4EYeggBwSHAdvo+FSk8rsnsydOD0VRar/WLza2x7qEAQG04+A3XnnnaXO46YmX0rsvfQKa2sGqy0Big/cnmrV9l2UDu/DKW8sSOosNe14uAroqohoFRACoeoiywsg/+cG/vma1Gk4yJ7NDC3LIhy4Gw0Hr5SFCuFwA2CEUFS4Oo5IhVg2/N1anxvjaSFZwQIm8CivKlQAdw24FjGk/HdjVeKy3cCtuUfdV3S2zIpAcHTf0DZ9dSElGie21IK11jeEPA1lSOI1u/7oaQyQSALrm370qxmpqrNFUAtgRBKjFHE3BqcW9gQsA0TSqhwNVz5PAlpOLDSkiBrlNB5AE1TsjzE5u4Uwo9/+H9Sir4UD7YjBKBo2pc79B/POPfvzSDWmEPFIVhcLcDRAT1J4tsQ9r+ZQUl9K72fXAMtLCygr68Pw8PDD8BwPQHAXU9+fj6m/v1yUHWpfd3OpVZSy99/CiM5PculsIWS3RAOvnMX0T376KWpNWhPTw/a2trQ3d2NfoKvu8JHu0JjVF3+LMh0OGI53NnbNdbEDVdeoaKSI9XS0Y9l7D93lo4OPtzyiRMncPPmTdTV1aF0xw48lkisVQw4nEFj+rdhJQPHlcAFCRLXWTCflOXSCIraL8vJxKsfLKYy61DTMNB+/LgPPdDcjHA4DM75v8PjrggmOu+WqOk6wa9eokwmnMU5qAdPwjzap4+tlJ7/5L1z/aMjt9DS0oJ4PI7JyUmMjo6ioaGB/GxDYmwjmCSQi5XsJVUyYLsKBLsA/tc85CNvQzr2+T0a60tzI99NWnoGuq5jhIaTWlmBqihIUNu5XE4o6LpQVFTEFYqtg2XRfk1j+cBqpQWYyXloHR9BOtwzRP93UmYUFRcjGAyCUVWxWAy19fV+dd7OE7irqwvZbBY3rl+HJEm+21lANjoVySJtyRWpeUjPXkT+cM/99PxiZ0hTEQqF/AqymQxkWcZX166hsrISjudrWoVCgVdVVWFwcBC3R0aYy7lgWZbDyPhP+MZf+h2s6QXguUvjE7/81mFnlxCJRKBpml8FAfwBNdOgtlqej6PRqOMVkslkXJbOCWWCaSEqM0jPXPqJzrQ01JRDDdT6d4N3d1RXVyOby2Fubs7TFKQnTNP0pRFFcdVe9KQhuutfXj5vZ9OUTWnuBGINb3gKBYKaD/QOe0+LIH/OzuLCxYt+B77dKNbb24upqan1y2tNHu830+TCsLjknEJt+12KjW/VZihcgv6BAXR0dKzHAoGA75KhoSG0trb6nXiuWOtSrDkz8L4WV5CfGqWUdJOZ2Y3bSKOsLL4B6t/X5AhvBh7ozp07vluamppg0IfjOUhUdh37teLC+HlW87SnQrE/yM2bW//pgoAiDSnoDdWTzANWkjtkqtrrQvAv79VV5rmKdh6PsKhiZXp6OkJaLzw8QE+GVCqFfwQYAK4TC6lGfHlJAAAAAElFTkSuQmCC" /><div class="text">Crafty '+Crafty.getVersion()+'</div><div class="clear"></div></a></li><div class="separator"></div><li class="bar-item entities" data-item="entities"><a title="Game entities" href="#"><img style="padding: 7px 8px 8px 0px;" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAYAAAAfSC3RAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA01pVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoMTMuMCAyMDEyMDMwNS5tLjQxNSAyMDEyLzAzLzA1OjIxOjAwOjAwKSAgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjExNDg1QjFGQTM0MzExRTFBOThEQ0REMTE2NzczM0ZEIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjExNDg1QjIwQTM0MzExRTFBOThEQ0REMTE2NzczM0ZEIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MTE0ODVCMURBMzQzMTFFMUE5OERDREQxMTY3NzMzRkQiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6MTE0ODVCMUVBMzQzMTFFMUE5OERDREQxMTY3NzMzRkQiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4EMWR+AAAAJUlEQVR42mL8DwQM2AEjlMYqzziqEb9GBnIARRpHo4PaGgECDADKe0HZMzUEpQAAAABJRU5ErkJggg==" /><div class="text">Entities</div><div class="clear"></div></a></li><div class="separator"></div><li class="bar-item graph" data-item="graph"><a href="#"><img style="padding: 6px 8px 8px 0px;" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABMAAAAQCAYAAAD0xERiAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA01pVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoMTMuMCAyMDEyMDMwNS5tLjQxNSAyMDEyLzAzLzA1OjIxOjAwOjAwKSAgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkVERDBEQjZEQTM0MjExRTE5Qzg5RkMzOTVDNzIyOEVEIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkVERDBEQjZFQTM0MjExRTE5Qzg5RkMzOTVDNzIyOEVEIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6RUREMERCNkJBMzQyMTFFMTlDODlGQzM5NUM3MjI4RUQiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6RUREMERCNkNBMzQyMTFFMTlDODlGQzM5NUM3MjI4RUQiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz5ftyAMAAAAM0lEQVR42mL8//8/AxaALsjIQARgYqAiGCGGsZAb2NgianB7kywvYQuO0XQ2ahgOABBgAAU5ByC5p5YEAAAAAElFTkSuQmCC" /><div class="text">Graph</div><div class="clear"></div></a></li><div class="separator"></div></ul>'+a+"</div>";return c+b},utils:{listEntities:function(c){if(c==""){c="*"}var h=[],f,a=function(e){return !isNaN(parseFloat(e))&&isFinite(e)};isID=a(c);if(isID){f=Crafty(parseInt(c));h.push({id:f[0],e:f})}else{if(c!=="*"){var b=Crafty(c),d=0;for(i in b){if(d++<50){if(!a(i)){continue}f=Crafty(b[i]);h.push({id:f[0],e:f})}}}else{if(c=="*"){var g=Crafty("*"),d=0;for(en in g){if(g.hasOwnProperty(en)&&typeof g[en]=="object"){f=g[en];if(d++<50){h.push({id:f[0],e:f})}}}}}}return h},addEntityComponent:function(c){var b=$("#crafty-debug #entities-box .components input.search").val(),a=$(c).data("entityId");Crafty(a).addComponent(b);b=$("#crafty-debug #entities-box .components input.search").val("");Crafty.debugBar.renders.renderEntityComponents(Crafty(a))},elementToTypedValue:function(a){if(a.data("type")=="number"){return parseFloat(a.val())}else{return a.val()}}},renders:{renderEntityDetails:function(a){Crafty.debugBar.renders.renderEntityAttributes(a);Crafty.debugBar.renders.renderEntityComponents(a);Crafty.debugBar.renders.renderEntityOptions(a)},renderEntitesList:function(a){var b=[];if(a.length==0){return"<h4>No results</h4>"}for(i in a){b.push('<li><a href="#" data-ent="'+a[i].id+'">'+a[i].e._entityName+"</a></li>")}return b.join("")},renderEntityAttributes:function(a){var b='<div class="attributes" data-ent="'+a[0]+'"><div class="single"><label>x</label><input data-type="'+typeof(a.x)+'" type="text" name="x" value="'+a.attr("x")+'" /><div class="clear"></div></div><div class="single"><label>y</label><input data-type="'+typeof(a.y)+'" type="text" name="y" value="'+a.attr("y")+'" /><div class="clear"></div></div><div class="single"><label>w</label><input data-type="'+typeof(a.w)+'" type="text" name="w" value="'+a.attr("w")+'" /><div class="clear"></div></div><div class="single"><label>h</label><input data-type="'+typeof(a.h)+'" type="text" name="h" value="'+a.attr("h")+'" /><div class="clear"></div></div><div class="single"><label>z</label><input data-type="'+typeof(a.z)+'" type="text" name="z" value="'+a.attr("z")+'" /><div class="clear"></div></div><div class="single"><label>rotation</label><input data-type="'+typeof(a.rotation)+'"  type="text" name="rotation" value="'+a.attr("rotation")+'" /><div class="clear"></div></div><div class="single"><label>alpha</label><input data-type="'+typeof(a.alpha)+'"  type="text" name="alpha" value="'+a.attr("alpha")+'" /><div class="clear"></div></div></div>';$("#crafty-debug #entities-box .properties .content").html(b)},renderEntityComponents:function(a){var b=[];var c=a.__c;for(i in c){b.push('<li><a href="#" data-comp="'+i+'">'+i+'</a><a href="#" data-entity-id="'+a[0]+'" data-comp="'+i+'" class="remove">x</a><div class="clear"></div></li>')}$("#entities-box .content .components .addComponent").data("entityId",a[0]);$("#entities-box .content .components .content").show();$("#entities-box .content .components .content #components-box-list").html(b.join(""))},renderEntityOptions:function(a){var b='<div class="attributes" data-ent="'+a[0]+'"><div class="btn btn-black draggable '+(a.__c.draggable?"off":"")+'">draggable '+(a.__c.draggable?"off":"on")+'</div><div class="btn btn-black visible '+(a.visible?"":"off")+'">'+(a.visible?"hide":"show")+'</div><div class="btn btn-black console">print to console</div><div class="btn btn-red remove">remove</div></div>';$("#crafty-debug #entities-box .options .content").html(b)}},}});$("#entities-search").keyup(function(){$("#entities-box-list").html(Crafty.debugBar.renders.renderEntitesList(Crafty.debugBar.utils.listEntities($(this).val())))});$("#crafty-debug ul.menu li.entities").live("click",function(){if($("#entities-box").is(":visible")){$("#entities-box").hide();$("#entities-box .options .content").hide()}else{$("#entities-box").show();$("#entities-box-list").html(Crafty.debugBar.renders.renderEntitesList(Crafty.debugBar.utils.listEntities("*")));$("#entities-box .options .content").show()}});$("#crafty-debug #entities-box .list ul li a").live("click",function(){Crafty.debugBar.renders.renderEntityDetails(Crafty($(this).data("ent")))});$("#crafty-debug #entities-box .components ul li a.remove").live("click",function(){var b=$(this).data("comp"),a=$(this).data("entityId");Crafty(a).removeComponent(b,false);Crafty.debugBar.renders.renderEntityComponents(Crafty(a))});$("#crafty-debug #entities-box .components .addComponent").live("click",function(){Crafty.debugBar.utils.addEntityComponent(this)});$("#crafty-debug #entities-box .components input.search").keypress(function(a){if(a.which==13){a.preventDefault();Crafty.debugBar.utils.addEntityComponent($("#crafty-debug #entities-box .components .addComponent"))}});$("#crafty-debug #entities-box .properties .content input").live("keyup",function(){var a=$(this).attr("name"),b=$(this).parent().parent();Crafty(b.data("ent")).attr(a,Crafty.debugBar.utils.elementToTypedValue($(this)))});$("#crafty-debug #entities-box .options .draggable").live("click",function(){var c=$(this).parent().data("ent"),a=Crafty(c),b=$(this);if(b.hasClass("off")){a.removeComponent("Draggable",false);b.removeClass("off");b.html("draggable on");a.unbind("Dragging")}else{a.addComponent("Draggable");b.addClass("off");b.html("draggable off");a.bind("Dragging",function(d){Crafty.debugBar.renders.renderEntityAttributes(a)})}Crafty.debugBar.renders.renderEntityComponents(a)});$("#crafty-debug #entities-box .options .visible").live("click",function(){var c=$(this).parent().data("ent"),a=Crafty(c),b=$(this);if(b.hasClass("off")){a.visible=true;b.removeClass("off");b.html("hide")}else{a.visible=false;b.addClass("off");b.html("show")}});$("#crafty-debug #entities-box .options .console").live("click",function(){var a=$(this).parent().data("ent");console.log(Crafty(a))});$("#crafty-debug #entities-box .options .remove").live("click",function(){var a=$(this).parent().data("ent");Crafty(a).destroy();$("#entities-box-list").html(Crafty.debugBar.renders.renderEntitesList(Crafty.debugBar.utils.listEntities("*")));$("#crafty-debug #entities-box .properties .content").html("");$("#crafty-debug #entities-box .options .content").html("");$("#crafty-debug #entities-box .components .content").html("")});