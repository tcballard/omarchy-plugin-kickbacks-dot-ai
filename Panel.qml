import QtQuick
import Quickshell
import Quickshell.Wayland
import qs.Commons
import qs.Ui
import QtQuick.Controls
import "lib/Sponsors.js" as Sponsors

Item {
  id: root
  property string omarchyPath: ""
  property var shell: null
  property var manifest: null
  property bool opened: false
  property var state: Sponsors.initial()
  property var display: Sponsors.presentation(state)
  function act(type, value) { state = Sponsors.transition(state, { type: type, value: value }) }

  function open(payloadJson) {
    root.opened = true
    act("visible", true)
  }

  function close() { act("waiting", false); act("visible", false); root.opened = false }

  PanelWindow {
    visible: root.opened
    anchors { top: true; right: true }
    margins { top: Style.gapsOut; right: Style.gapsOut }
    implicitWidth: Style.space(460)
    implicitHeight: Style.space(420)
    color: "transparent"
    WlrLayershell.namespace: "io-github-tcballard-agent-sponsors"
    WlrLayershell.layer: WlrLayer.Top
    WlrLayershell.keyboardFocus: root.opened ? WlrKeyboardFocus.OnDemand : WlrKeyboardFocus.None
    exclusionMode: ExclusionMode.Ignore

    BorderSurface {
      anchors.fill: parent
      color: Color.popups.background
      radius: Style.cornerRadius
      borderSpec: Border.surfaceSpec("popups", "border", Color.popups.border, 1)
      padding: Style.spacing.panelPadding

      Column {
        spacing: Style.spacing.md
        Text { textFormat: Text.PlainText; text: "Agent Sponsors"; color: Color.popups.text; font.pixelSize: Style.font.title }
        Text { textFormat: Text.PlainText; text: "Local preview · No earnings"; color: Color.popups.text; font.pixelSize: Style.font.body }
        Text { textFormat: Text.PlainText; text: "Kickbacks connection unavailable"; color: Color.popups.text; font.pixelSize: Style.font.body }
        ComboBox {
          model: ["Claude Code", "Codex"]
          onActivated: root.act("agent", currentIndex === 0 ? "claude" : "codex")
        }
        CheckBox {
          text: "Enable local demo"
          checked: root.state.consent
          onToggled: root.act("consent", checked)
        }
        Text {
          width: Style.space(380); wrapMode: Text.WordWrap
          textFormat: Text.PlainText; text: root.display.text
          color: Color.popups.text; font.pixelSize: Style.font.body
        }
        Row {
          spacing: Style.spacing.md
          Button {
            text: root.state.waiting ? "Finish demo wait" : "Simulate wait"
            enabled: root.state.consent && !root.state.paused
            onClicked: root.act("waiting", !root.state.waiting)
          }
          Button {
            text: root.state.paused ? "Resume" : "Pause"
            onClicked: root.act("pause", !root.state.paused)
          }
          Button { text: "Close"; onClicked: root.close() }
        }
      }
    }
  }
}
