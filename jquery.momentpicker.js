(function($){
    $.fn.momentpicker = function(options){
        var defaults = {
                uncheckedColor: '#f7f7f9', // dark grey
                disabledColor: '#999', // light grey
                colors: ['#5cb85c','#d9534f','#f0ad4e'], // green, red, yellow
                uncheckedTitle: '',
                disabledTitle: '',
                titles: []
            };
        var options =  $.extend(defaults, options);
        // shortcuts because we are lazy
        var colors = options.colors;
        var titles = options.titles;
        // group ensures that we only execute this once for every group of inputs
        var group = {};
        return this.each(function(){
            var name = this.name;
            if (!group[name]) {
                group[name] = true;

                var originalRadiogroup = $('input[type="radio"][name="'+name+'"]');
                var toggleBox;

              
                if(this.disabled){
                    toggleBox = $('<span>',{
                        'class' : 'momentpicker-toggle',
                        'style' : 'background-color: ' + options.disabledColor,
                        'title' : options.disabledTitle,
                        html:   ''
                    });
                } else {
                    var checked = originalRadiogroup.filter(':checked');
                    var checkedIndex = originalRadiogroup.index(checked);

                    toggleBox = $('<span>',{
                        'class' : 'momentpicker-toggle',
                        'style' : 'background-color: ' + ((checkedIndex===-1) ? options.uncheckedColor : colors[checkedIndex]),
                        'title' : ((checkedIndex===-1) ? options.uncheckedTitle : titles[checkedIndex]),
                        html:   ''
                    });
                            
                    toggleBox.click(function(){
                        var checked = originalRadiogroup.filter(':checked');
                        var checkedIndex = originalRadiogroup.index(checked);
                        var nextIndex = checkedIndex+1;
                        if(originalRadiogroup.length===nextIndex){
                            nextIndex=0;
                        }
                        var next = originalRadiogroup.eq(nextIndex);
                        next.prop("checked", true);
                        toggleBox.css('background-color',colors[nextIndex]);
                        toggleBox.prop('title',titles[nextIndex ]);
                    });
                }
                toggleBox.insertBefore($(this));
                originalRadiogroup.hide();
                toggleBox.show();

            }
        });$

    };
})(jQuery);