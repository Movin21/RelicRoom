import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { useForm, SubmitHandler } from 'react-hook-form';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Card,
  CardContent,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

interface FormValues {
  id: string;
  Question: string;
  Answer: string;
}

function Update() {
  const navigate = useNavigate();
  const form = useForm<FormValues>();
  const { id } = useParams<{ id: string }>();
  const [values, setValues] = useState<FormValues>({
    id: id || '',
    Question: '',
    Answer: '',
  });

  useEffect(() => {
    if (id) {
      axios
        .get(`http://localhost:3000/customerCare/faq/get/${id}`)
        .then((response) => {
          setValues({
            ...values,
            Question: response.data.Question,
            Answer: response.data.Answer,
          });
        })
        .catch((error) => {
          console.error('Error fetching FAQs:', error);
        });
    }
  }, [id]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleSubmit: SubmitHandler<FormValues> = () => {
    axios
      .patch(`http://localhost:3000/customerCare/faq/update/${id}`, values)
      .then((res) => {
        console.log(res);
        navigate('/FaqManage');
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <Card className='w-2/4 mx-auto mt-20 bg-gradient-to-tl from-orange-950 to-yellow-100'>
        <CardContent className='mx-auto'>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className='space-y-8 text-yellow-950 font-akshar'
            >
              <div>
                <FormField
                  control={form.control}
                  name='Question'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Question</FormLabel>
                      <FormControl className='w-96'>
                        <Input
                          placeholder='Enter the Question..'
                          {...field}
                          value={values.Question}
                          onChange={handleInputChange}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name='Answer'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Answer</FormLabel>
                    <FormControl className='w-96'>
                      <Input
                        placeholder='Enter the answer..'
                        {...field}
                        value={values.Answer}
                        onChange={handleInputChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type='submit' className='w-1/6 mx-36'>
                Update
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}

export default Update;