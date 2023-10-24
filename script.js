var interval;
var off = true;

$player = new Audio("music.mp3");
$player.volume = 0.1;
$player.loop = true;
$note = $("#note");
$note.prop("opacity", "0.2");

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));	
}

function toggle_music() {
	$player.play();

	vol = $player.volume;
	off = !off;
	$note.animate({opacity: off ? 0.2 : 0.7}, 500, "linear");
	//$player.animate({volume: vol==0.1 ? 0 : 0.1}, 2000, "linear");
	interval = setInterval(function () {fade(off ? 0 : 0.1)}, 200);
}

function fade(target) {
	if (Math.abs(target - vol) < 0.01) {
		vol = target;
		clearInterval(interval);
	}
	else {
		vol += Math.sign(target - vol) * 0.005;
	}
	$player.volume = vol;
}

async function tagclick(n) {
	var tags = $("#tagline")
	for (var i = 0; i < tags.children().length; i++) {
		if (i != n) {tags.children()[i].classList = ""}
	}
	tags.children()[n].classList = "selected";
	tags.addClass("selected");
	$("#logo").addClass("selected");
	await sleep(300);
	$("#content").addClass("selected");
}

async function reset() {
	$("#content").removeClass("selected");
	var tags = $("#tagline")
	for (var i = 0; i < tags.children().length; i++) {
		tags.children()[i].classList = "";
	}
	tags.removeClass("selected");
	$("#logo").removeClass("selected");
}
