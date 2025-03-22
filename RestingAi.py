import time





class RestingAi:    


    


    def __init__(self):
        self.timepassed = 0
        self.baseline = 25
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
        

    def ArrayEvaluation(self):
        ## now we want to check if the person has hit 10 minutes worth of 
        ## this is the case of total baseline reduction. Since the user is not happy.
        if(self.Emotion_Array[0]>= 60 or self.Emotion_Array[1]>= 60):
            self.TotalBaseLineReduction()



    def dealWithResposne(self,Emotion):
        ## This is the case where we don't have any face 
        if(Emotion == 'None'):
            return None
        elif (Emotion == "Angry"):
            self.Emotion_Array[0] = self.Emotion_Array[0]+1
        elif(Emotion=="Stress"):
            self.Emotion_Array[1] = self.Emotion_Array[1]+1
        elif(Emotion == "Sad"):
            self.Emotion_Array[2] = self.Emotion_Array[2] + 1
        elif(Emotion == "Fear"):
            self.Emotion_Array[3] = self.Emotion_Array[3] + 1
        elif(Emotion == "Neutral"):
            self.Emotion_Array[4] = self.Emotion_Array[4] + 1
        elif(Emotion == "Surprise"):
            self.Emotion_Array[5] = self.Emotion_Array[5]+1
        elif(Emotion == "Happy"):
            self.Emotion_Array[6] = self.Emotion_Array[6] + 1
        
        self.ArrayEvaluation()



    def timing(self):
        print(self.timepassed)
        ## this is where we send it to to the AI.
        ## response = sendTOAI();
        ## self.DealWithResponse()
        time.sleep(10)

        self.timepassed = self.timepassed +1
        print(self.timepassed)






  

    def hi(self):
        print("hello world")
        self.timing()
        




