/**
 * description: This is a suggestive pseudo-code on how to play the game.
 *              Take your time to go through it, as it helps for the next questions. 
 * author: Doren Calliku (dcalliku@gmail.com)
 * date: 20/11/2019
 * edit history: v1. Added main steps
 *              v2. Changed header
 */             //<= missing name of the file, take all lines in the Header, select Header. 

open crsg(code review serious game)

// login
if first time -> register ( email, username, password)
else -> login (username, password)

// main logic
for each of the levels in the screen in order:

  // open level
  open level (click on "play this level")
  read description of level 
  read code
  check hint for number of total errors
                //<= there is an extra space line here - Blank Lines
                
  // find errors
  for each specific error type in checklist

      // understanding errors
      if do not know what error means -> check description in guide

      // error found
      if specific error in code
      add error            // <= Both these lines are not indented, Indentation
      add type

      // no more errors to find
      if number of errors you found is equal to the number of errors from the hint
          break the loop 

  // end level 
  submit
  check your score

  // go back
  go back to intro page