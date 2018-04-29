<?php
//set variable for tag
$tag=strtolower(trim($_POST['searchtag']));

//checking for correct data submitted
if(!$tag){
	echo '<p>Please enter the correct tag</p>';
	exit;
}

// displays tag
echo "<p>The tag you chose: " . $tag . "</p>";
//check if database connection
$db=new mysqli('localhost', 'u856159605_quiz', 'Amand@l0ve', 'u856159605_quiz');
if (mysqli_connect_errno()){
	echo '<p>Error. Could not connect</p>';
	exit;
}

$query="SELECT tag, nickname, car, score, medals FROM scores WHERE tag=?";
$stmt = $db->prepare($query);
$stmt->bind_param('s', $tag);
$stmt->execute();
$stmt->store_result();

$stmt->bind_result($tag, $nickname, $car, $score, $medals);

echo '<p>Players: '.$stmt->num_rows.'</p>';
echo '<table>';
echo '<tr>';
echo '<th>Tag</th>';
echo '<th>Nickname</th>';
echo '<th>Car</th>';
echo '<th>Score</th>';
echo '<th>Medals</th>';
echo '</tr>';
while($stmt->fetch()){
	echo "<tr>";
	echo "<td>".$tag."</td>";
	echo "<td>".$nickname."</td>";
	echo "<td>".$car."</td>";
	echo "<td>".$score."</td>";
	echo "<td>".$medals."</td>";
	echo "</tr>";
}
echo '</table>';
$stmt->free_result();
$stmt->close();
?>