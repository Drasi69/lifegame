package hu.drasi.lifegame;

public class ControlPanel {
  private int rows = 6;
  private int cols = 12;
  private boolean infinite = false;
  private boolean large = false;
  
  public void setInfinite(boolean infinite) {
    this.infinite = infinite;
  }

  public void setLarge(boolean large) {
    this.large = large;
    if (large) {
      rows = 12;
      cols = 24;
    } else {
      rows = 6;
      cols = 12;
    }
  }

  public int getRows() {
    return rows;
  }

  public int getCols() {
    return cols;
  }

  public boolean isInfinite() {
    return infinite;
  }

  public boolean isLarge() {
    return large;
  }
}
