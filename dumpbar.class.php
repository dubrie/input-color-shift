<?php
                
class dumpBar {
		        
		        const NUM_CHARS = 140;
				        const STARTING_COLOR = '66FF00';
				        const ENDING_COLOR = 'FF3333';
						        
						        public function __construct() {
										                
										        }
						        
						        public static function render() {
										                $numChars = dumpBar::NUM_CHARS;
														                $dumpBarHTML = <<<DUMPBARHTML
                <table id="dumpBar">
                        <tr>
                                <td style="background-color: #fff;"></td>
                                <td id="dumpBarRight" style="padding: 10px;" rowspan="3">{$numChars}</td>
                        </tr>
                        <tr>
                                <td id="dumpBarLeft"></td>
                        </tr>
                        <tr>
                                <td style="background-color: #fff;"></td>
                        </tr>
                </table>
DUMPBARHTML;
														                 
														                echo $dumpBarHTML; 
														        }

}

?>
