var PlayControls = function (jqPausePlay, jqForward, jqBackward, jqSlider) {
	jqPausePlay.on('click', function () {
		this.onPausePlayPressed();
	});
	jqForward.on('click', function () {
		this.onForwardPressed();
	});
	jqBackward.on('click', function () {
		this.onBackwardPressed();
	});

	var customSlider = new CustomSlider(jqSlider, this);

	this.onPausePlayPressed = function () {
		player.togglePlayback();
	}
	this.onForwardPressed = function () {
		player.skipForward();
	}
	this.onBackwardPressed = function () {
		player.skipBackward();
	}
	this.onSliderRelease = function () {
		player.seekTo(customSlider.getSliderValue());
	}
	this.updateSliderWhilePlaying = function () {
		customSlider.updateValue();
	}

	var enabled = false;
	this.setEnabled = function (state) {
		if (state != enabled) {
			setEnabledHelper(state);
			enabled = state;
		}
	}
	var setEnabledHelper = function (state) {
		jqPausePlay.prop("disabled", state);
		jqForward.prop("disabled", state);
		jqBackward.prop("disabled", state);
		customSlider.setEnabled(state);
	}
	this.getEnabled = function () {
		return enabled;
	}
}

var CustomSlider = function (jqSlider, controller) {
	var held = false;

	jqSlider.on('mousedown', function () {
		held = this.getEnabled();
	});
	jqSlider.on('mouseup', function () {
		held = false;
		if (this.getEnabled()) {
			controller.onSliderRelease();
		}
	});

	this.getHeld = function () {
		return held;
	}
	this.getSliderValue = function () {
		return parseFloat(jqSlider.val());
	}
	this.setEnabled = function (state) {
		held = held && !state;
		jqSlider.prop("disabled", !state);
	}
	this.getEnabled = function () {
		return !jqSlider.prop("disabled");
	}
	this.updateValue = function () {
		if (!held) {
			jqSlider.val(player.getRatio());
		}
	}
}