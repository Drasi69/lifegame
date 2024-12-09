package hu.drasi.lifegame;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.cors.CorsConfiguration;

@CrossOrigin(
    origins = CorsConfiguration.ALL,
    allowedHeaders = CorsConfiguration.ALL,
    methods = {
            RequestMethod.GET,
            RequestMethod.POST,
            RequestMethod.HEAD,
            RequestMethod.OPTIONS,
    }, maxAge = 3600)
@RestController
@RequestMapping("lifegame")
public class LifeGameController {
  @Autowired
  private ControlPanelService controlPanelService;
  @Autowired
  private GameService gameService;
  
  protected LifeGameController() {
    
  }
  
  @GetMapping("/board/new")
  ResponseEntity<String[][]> newBoard(int rows, int cols) {
    String[][] board = new String[rows][cols];
    board[0][1] = "X";
    board[0][2] = "X";
    board[1][1] = "X";
    board[1][4] = "X";
    return ResponseEntity.ok(board);
  }
  
  @GetMapping("/controlpanel")
  ResponseEntity<ControlPanel> getControlPanel() {
    return ResponseEntity.ok(controlPanelService.getControlPanel());
  }
  
  @PostMapping("/controlpanel")
  ResponseEntity<ControlPanel> setControlPanel(boolean infinite, boolean large) {
    controlPanelService.setControlPanel(infinite, large);
    return ResponseEntity.ok(controlPanelService.getControlPanel());
  }
  
  @PostMapping("/board/resize")
  ResponseEntity<String[][]> resizeBoard(@RequestBody BoardDto board) {
    ControlPanel cp = controlPanelService.getControlPanel();
    String[][] newBoard = new String[cp.getRows()][cp.getCols()];
    copyBoard(board.getBoard(), newBoard);
    return ResponseEntity.ok(newBoard);
  }
  
  private void copyBoard(String[][] oldBoard, String[][] newBoard) {
    for (int r = 0; r < 6; r++) {
      for (int c = 0; c < 12; c++) {
        newBoard[r][c] = oldBoard[r][c];
      }
    }
  }
  
  @PostMapping("/play")
  ResponseEntity<String[][]> play(@RequestBody BoardDto board) {
    return ResponseEntity.ok(gameService.play(board.getBoard()));
  }
}
