#!/usr/bin/env python
# coding: utf-8
"""
* filename: level_uploader.py
* author: Doren
* function: generate exercises for students using crsg
* date: 22.11.2019
* version: * write exercises <- Solved
           * add errors <- Solved
           * connect to firebase from here <- Solved
           * change errors and checklist <- Solved
           * read files from outside, update Firebase (now)
           * grade automatically simple tasks(TODO)
"""

# PACKAGES
import pyrebase # connects with firebase
import json # reads and stores json files and data
from glob import glob # helps to extract file names from folders


## VARIABLE INITIALIZATION (Python:No need for separate declaration)
l_levels = [] # level's list, main storage

# info required for level, use by copying it
level_sample = { "fileName": "Default",
                "code": "Default", 
                "errors": [], 
                "hints": [], 
                "narrative": "Default"}

# Not needed for now
# extract the list of errors one can make
#with open( "errors.json") as f: 
#    l_errors = json.load(f) 
#error_sample = { "lines": [], "reason": ""} # info about error

# read the descriptive narrative from the outside
with open( "narrative.json") as f: 
    l_narratives = json.load( f)

# read hints from outside
with open( "hints.json") as f: 
    l_hints = json.load( f)
    
# goes to the subdirectory "exercises" 
# and extracts all the files ending with ".java"
l_exercise_files = glob( 'exercises/*.java')

# configuration for the connection
json_firebase_configuration = { """XXXXX""":"xxxxx" }


## MAIN LOGIC
if __name__ == "__main__":
    
    # sort files according to their names
    l_exercise_files.sort() 
    
    # go through all the files you have and create a level for each
    for i_file in l_exercise_files:

        # copy structure for consistency
        i_level = level_sample.copy() 

        # take content of file from the file
        with open( i_file) as f:
            i_level['code'] = f.read()
        i_level['fileName'] = i_file # put the name of the file
        i_level["hints"] = l_hints
        i_level['narrative'] = l_narratives[ 0]

        # add this to the list of levels
        l_levels.append( i_level)

    # connect with Firebase database
    firebase = pyrebase.initialize_app( json_firebase_configuration)
    db = firebase.database()

    # create backup by retrieving played games, and user information
    #games = db.child("games").get().val()
    #users = db.child("users").get().val()
    #with open("backup.json", "w+") as f:
    #    json.dump( {"games":games,"users":users}, f)

    # set the value of the levels accordingly    
    db.child('levels').set(l_levels)
