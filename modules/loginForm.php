<?PHP
echo "<div class='loginBox win'>";

echo "<div class='vsync'></div>";

//MENU
echo "<div class='windowMenu'>";
echo "<div class='icon'><div class='minimize' onclick='minGo(this);'></div></div>";
echo "<div class='icon'><div class='maximize' onclick='maxGo(this);'></div></div>";
//echo "<div class='icon'><div class='close'></div></div>";
echo "</div>";

echo "<div class='windowContent'>";

echo "<span id='inputs' class='float-Left 2-Col'>";

//LOGIN FORM
echo "<div class='input-form'>";
	//USER NAME
	echo "<div class='input-item style1 tagged'>";
		echo "<div class='input-tag'>";
			echo "UN";
		echo "</div>";
		echo "<div class='input-text'>";
			echo "<input id='userName' placeholder='User Name' type='text' onchange='inputChange(this);' onkeydown='inputChange(this);' onblur='inputChange(this);'></input>";
		echo "</div>";
	echo "</div>";
	//USER PASSWORD
	echo "<div class='input-item style1 tagged'>";
		echo "<div class='input-tag'>";
			echo "PW";
		echo "</div>";
		echo "<div class='input-password'>";
			echo "<input id='userPass' placeholder='password' type='password' onchange='inputChange(this);' onkeydown='inputChange(this);' onblur='inputChange(this);'></input>";
		echo "</div>";
	echo "</div>";
	
	echo "</div>";	
	
echo "</span>";	


//TEXT AREA;
echo "<span class='float-Right 2-Col' style='width:50%;'>";
echo "<span class='typeA float-Left textArea'>";
echo "<h1>Pryme8 User Interface v0.0.1</h1>";
echo "</br><p><h4>Welcome</h4>, please feel free to login and look around.  If you do not have a user name and pass simply enter
		<i><h5>Guest</h5></i> and <i><h5>Pass</h5></i> in their respective fields.</p>";

echo "</span>";	
echo "</span>";	
	

	
echo "</div>";
echo "</div>";
echo "<script>bindInputAnimations();</script>"
?>