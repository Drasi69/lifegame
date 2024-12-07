package hu.drasi.lifegame;

import org.springframework.stereotype.Service;

@Service
public class ControlPanelService {
  private ControlPanel controlPanel;
  
  public ControlPanelService() {
    controlPanel = new ControlPanel();
  }
  
  public synchronized ControlPanel getControlPanel() {
    return controlPanel;
  }

  public synchronized void setControlPanel(boolean infinite, boolean large) {
    controlPanel.setInfinite(infinite);
    controlPanel.setLarge(large);
  }
}
