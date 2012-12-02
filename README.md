inputColorShift
====

**inputColorShift** is a jQuery plugin for dynamically adding a character counter and a color-changing bar to indicate your remaining input characters.  This can be applied to 
any HTML text input field.  This is meant to be a collaborative project so please fork and do some magic! 

Basic Example
-------------

The basic example will work on any HTML text input field of any (reasonable) size.  To start using the plugin, define a class for your input field and apply the plugin to it:
    
```
<body>
    <script type="text/javascript">
        $().ready(function() {
            $('.colorShifter').inputColorShift();
        });
    </script>

    <p>
        <input class="colorShifter" />
    </p>
</body>
```

## Optional Parameters

**maxlength**  
*Integer* [default: 100] Sets the maximum string length you want to allow in your input field

**startColor**  
*HexCode* [default: #66FF00] Sets the starting color, in proper hexcode format, of the progress bar under the input field

**endColor**  
*HexCode* [default: #FF3333] Sets the ending color, in proper hexcode format, of the progress bar under the input field.  The progress bar will automatically shift from the startColor to the endColor as you type

**barRightOffset**  
*Integer* [default: 20] Sets the offset of the right edge of the bar to allow space for the character counter


TODO
----

* More input types other than "text"
* Better customization

