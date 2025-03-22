import time





class RestingAi:    


    


    def __init__(self):
        self.timepassed = 0
        ## this is how many 10 seconds there are in 25 minutes.
        self.baseline = 150

        
        ## this variable keeps track of the current baseline total.
        self.baselineCounter = 0
        print("In the constructor")
        self.behaviour = ''
        #TODO change the Array into actual values. 
        ## I did six emotions Although that may be wroong.
        self.Emotion_Array = [0,0,0,0,0,0,0]
        ## I will have angry as angry 0, stressed 1, sad 2,fear 3 ,neutral 4, suprised 5,happy 6. 
        # Angry, fear,happy,neutral,sad,suprised,stressed    
         #['Neutral', 'Sad', 'Happy', 'Angry', 'Fear', 'Suprise', 'Stress', 'Unknown']




    def TotalBaseLineReduction(self):
        self.baseline = 10
        self.baselineCounter = 0
        #TODO send messsage to api with a NEGATIVE VALUE TO INDICATE INTERRUPT
        self.Emotion_Array = [0,0,0,0,0,0,0]
        print("This is where we would have an interrupt")
        time.sleep(5)


    def ArrayEvaluation(self, index):
        ## now we want to check if the person has hit 10 minutes worth of 
        ## this is the case of total baseline reduction. Since the user is not happy.
        if(self.Emotion_Array[0]>= 60 or self.Emotion_Array[1]>= 60):
            self.TotalBaseLineReduction()
        ## this is the case where we have reached the end of the baseline.
        ## what we need to do is to we send a response to the API that can be like a -2 or something
        ## that way we know that we have reached the end.
        elif(self.baselineCounter >= self.baseline):
            if(index == 0 or index == 1 or index == 2 or index == 3):
                ## because we want to set the baseline counter to 0
                self.baselineCounter = 0
                ## resetting the emotion array back to zero
                self.Emotion_Array = [0,0,0,0,0,0,0]
                ## since we expereience negative emotion, we are making the new baseline five minutes less
                self.baseline = self.baseline - 5
                print(self.baseline)
            ## this is when it is neutral, we are going to be keeping it the same
            elif(index == 4):
                self.baselineCounter = 0
                self.Emotion_Array = [0,0,0,0,0,0,0]
            ## now this is the case where we have a happy situation.
            else:
                ## we don't want to be studying more than 50 minutes at a given time.
                if(self.baseline < 300):
                    self.baselineCounter= 0
                    print("We have reached 150 worth of happy.")
                    self.baseline = self.baseline + 5
                    self.Emotion_Array = [0,0,0,0,0,0,0]
        else:
            ## TODO this is the case where we return to the API with the index of the incremented value.
            
            print(self.baselineCounter)


    def dealWithResposne(self,Emotion):
        index = 0
        ## This is the case where we don't have any face 
        if(Emotion == 'None'):
            ## TODO look at this none, I honestly don't know what to think of it.
            return None
        elif (Emotion == "Angry"):
            self.Emotion_Array[0] = self.Emotion_Array[0]+1
        elif(Emotion=="Stress"):
            self.Emotion_Array[1] = self.Emotion_Array[1]+1
            index = 1
        elif(Emotion == "Sad"):
            self.Emotion_Array[2] = self.Emotion_Array[2] + 1
            index = 2
        elif(Emotion == "Fear"):
            self.Emotion_Array[3] = self.Emotion_Array[3] + 1
            index = 3
        elif(Emotion == "Neutral"):
            index = 4
            self.Emotion_Array[4] = self.Emotion_Array[4] + 1
        elif(Emotion == "Surprise"):
            index = 5
            self.Emotion_Array[5] = self.Emotion_Array[5]+1
        elif(Emotion == "Happy"):
            index = 6
            self.Emotion_Array[6] = self.Emotion_Array[6] + 1

        ## this is to make sure we haven't reached the baseline counter yet.
        self.baselineCounter = self.baselineCounter + 1
        self.ArrayEvaluation(index)



    def timing(self):
        print(self.timepassed)
        ## this is where we send it to to the AI.
        ## response = sendTOAI();
        ## self.DealWithResponse()
        time.sleep(10)

        self.timepassed = self.timepassed +1
        print(self.timepassed)






  
    ## TODO delete this lmao.
    def hi(self, emotion):
        self.dealWithResposne(emotion)
        
        




