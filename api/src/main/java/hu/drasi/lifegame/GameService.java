package hu.drasi.lifegame;

import java.util.ArrayList;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class GameService {
  @Autowired
  private ControlPanelService controlPanelService;
  
  public String[][] play(String[][] board) {
    ControlPanel cp = controlPanelService.getControlPanel();
    int n = 0;
    List<Point> deads = new ArrayList<Point>();
    List<Point> lives = new ArrayList<Point>();

    for (int row = 0; row < cp.getRows(); row++) {
      for (int col = 0; col < cp.getCols(); col++) {
        n = getNeighbours(row, col, board, cp);
        if ((board[row][col] == null || "".equals(board[row][col])) && n == 3) {
          lives.add(new Point(row, col));
        } else if ("X".equals(board[row][col]) && (n < 2 || n > 3)) {
          deads.add(new Point(row, col));
        }
      }
    }

    for (Point i : lives) {
      board[i.getX()][i.getY()] = "X";
    }

    for (Point i : deads) {
      board[i.getX()][i.getY()] = "";
    }
    
    return board;
  }

  private int getNeighbours(int row, int col, String[][] board, ControlPanel cp) {
    int num = 0;

    if (row > 0) {
      if (col > 0 && "X".equals(board[row - 1][col - 1])) {
        num++;
      }
      if ("X".equals(board[row - 1][col])) num++;
      if (col < cp.getCols() - 1 && "X".equals(board[row - 1][col + 1])) {
        num++;
      }
    }
    if (col > 0 && "X".equals(board[row][col - 1])) {
      num++;
    }
    if (col < cp.getCols() - 1 && "X".equals(board[row][col + 1])) {
      num++;
    }
    if (row < cp.getRows() - 1) {
      if (col > 0 && "X".equals(board[row + 1][col - 1])) {
        num++;
      }
      if ("X".equals(board[row + 1][col])) num++;
      if (col < cp.getRows() - 1 && "X".equals(board[row + 1][col + 1])) {
        num++;
      }
    }

    return num;
  }
}
